The key idea is:

> **Node.js does not handle thousands of requests by executing thousands of JavaScript functions simultaneously. It handles them by avoiding blocking the JavaScript thread while requests are waiting on I/O.**

Imagine a Node.js API server receiving 10,000 requests. JavaScript itself is mostly running on **one thread**, but most requests spend much of their lifetime **waiting**, not executing JavaScript.

## 1. Single JavaScript thread → Call stack

Suppose you have:

```js
app.get("/user/:id", async (req, res) => {
  const user = await db.findUser(req.params.id);
  res.json(user);
});
```

When a request arrives, Node starts executing your JavaScript handler on the main JavaScript thread.

Functions currently executing live on the **call stack**.

Conceptually:

```text
JavaScript Thread

        Call Stack
      ┌──────────────┐
      │ findUser()   │
      │ handler()    │
      └──────────────┘
```

Only one piece of JavaScript can execute on this thread at a time.

So you might reasonably ask:

**If request #1 queries the database and takes 200 ms, doesn't request #2 have to wait 200 ms?**

No—and that's where asynchronous I/O becomes important.

---

# 2. Call stack → asynchronous I/O

Consider:

```js
const user = await db.findUser(id);
```

The database might take 200 ms to respond.

Node does **not** keep the JavaScript thread occupied for those 200 ms.

Instead, roughly speaking:

```text
JS Thread
   │
   │ Start database operation
   ▼
┌─────────────┐
│ Database /  │
│ OS / libuv  │
└─────────────┘
   │
   │ waiting...
   │
   │
JS thread is free!
```

The database operation happens asynchronously.

The JavaScript thread can therefore move on and process another request.

---

# 3. This is why thousands of concurrent requests are possible

Imagine three requests:

```text
Request A → database query → takes 200ms
Request B → database query → takes 300ms
Request C → database query → takes 100ms
```

A synchronous server could behave like:

```text
Request A
████████████████████ 200ms

                    Request B
                    ██████████████████████████████ 300ms

                                                  Request C
                                                  ██████████ 100ms
```

Total ≈ 600 ms.

Node can instead do something conceptually like:

```text
time ────────────────────────────────►

JS:   A  B  C
      │  │  │
      ▼  ▼  ▼
DB:   ├──────── A ────────┤
         ├──────────── B ───────────┤
            ├──── C ────┤

JS:                 C    A          B
                    ▲    ▲          ▲
                 resume resume    resume
```

JavaScript only spends a tiny amount of time **starting** each operation and later **processing its result**.

The requests are concurrent even though their JavaScript isn't executing simultaneously.

That's the important distinction:

**Concurrency ≠ parallelism.**

---

# 4. Who actually handles the I/O? → OS + libuv

Underneath Node.js is **libuv**, a native library responsible for much of Node's asynchronous I/O infrastructure and event loop.

And libuv itself relies heavily on the **operating system**.

A simplified architecture looks like:

```text
             Your JavaScript
                   │
                   ▼
            ┌─────────────┐
            │ Node.js APIs│
            └──────┬──────┘
                   │
                   ▼
              ┌─────────┐
              │  libuv  │
              └────┬────┘
                   │
                   ▼
            Operating System
        ┌─────────┬─────────┐
        │ Network │ Files   │
        │ sockets │ etc.    │
        └─────────┴─────────┘
```

For network I/O, the OS provides efficient mechanisms for monitoring many sockets.

On Linux, for example, this commonly involves `epoll`.

So Node doesn't need:

```text
Request 1 → JS thread 1
Request 2 → JS thread 2
Request 3 → JS thread 3
...
Request 10000 → JS thread 10000
```

Instead, it can effectively say:

```text
"OS, tell me when these sockets have something ready."
```

Meanwhile, the JavaScript thread continues doing other work.

One nuance worth knowing: **not every asynchronous operation works exactly the same way.** Some operations—such as certain filesystem, DNS and crypto operations—use libuv's worker thread pool. Network sockets are generally handled using the OS's asynchronous readiness mechanisms rather than assigning one thread per connection.

---

# 5. Where does the event loop come in?

Now suppose request A's database response becomes available.

Something needs to eventually get the associated JavaScript running again.

That's where the **event loop** comes into the picture.

Think of it as Node repeatedly asking:

> "Is there JavaScript that's ready to run now?"

Conceptually:

```text
             ┌────────────────┐
             │   Call Stack   │
             │                │
             └───────▲────────┘
                     │
                     │ ready work
                     │
             ┌───────┴────────┐
             │   Event Loop   │
             └───────▲────────┘
                     │
          I/O completed / timers / etc.
                     │
             ┌───────┴────────┐
             │  OS / libuv    │
             └────────────────┘
```

When JavaScript is currently executing, it runs until it gives control back.

Then Node can process more ready work.

This cycle happens extremely quickly.

---

# 6. Where do Promise and `await` fit?

This is where people sometimes get confused.

`await` does **not** mean:

> "Block the JavaScript thread until this finishes."

Consider:

```js
async function getUser() {
  const user = await db.findUser(123);

  console.log(user);
}
```

When Node reaches:

```js
await db.findUser(123);
```

and the Promise is still pending, execution of **that async function** is suspended.

But the JavaScript thread is not blocked.

Conceptually:

```text
getUser()

    │
    ▼
db.findUser()
    │
    ▼
Promise pending
    │
    ▼
await suspends getUser()
    │
    ▼
Call stack becomes free
    │
    ▼
Node handles other work
```

Later:

```text
Database responds
      │
      ▼
Promise settles
      │
      ▼
continuation becomes runnable
      │
      ▼
event loop reaches appropriate point
      │
      ▼
getUser() continues
```

Promise continuations are processed through JavaScript's **microtask queue**.

So you can mentally model:

```js
const user = await getUser();
console.log(user);
```

roughly as:

```js
getUser().then((user) => {
  console.log(user);
});
```

Not identical syntax-wise, but it's a useful mental model.

---

# 7. Database waiting is the perfect example

Suppose your API does:

```js
app.get("/products", async (req, res) => {
  const products = await db.query("SELECT * FROM products");

  res.json(products);
});
```

Maybe the actual JavaScript work takes only:

```text
1 ms
```

but the database takes:

```text
100 ms
```

That request's lifetime is approximately:

```text
JS work       DB waiting                    JS work
  │               │                           │
  ▼               ▼                           ▼

██ ────────────────────────────────────────── ██
1ms                  ~100ms                   1ms
```

For ~100 ms, JavaScript isn't doing work for this request.

So Node can handle other requests:

```text
Request 1: ██ ─────────────────── ██
Request 2:    ██ ─────────────── ██
Request 3:       ██ ─────── ██
Request 4:          ██ ───────────────── ██
Request 5:             ██ ───── ██
                       ...
```

This is why Node works particularly well for **I/O-heavy applications**, such as APIs, real-time applications and services making lots of database/network calls.

---

# 8. But there is a catch: CPU-heavy work

Now imagine you do this:

```js
app.get("/calculate", (req, res) => {
  let result = 0;

  for (let i = 0; i < 10_000_000_000; i++) {
    result += Math.sqrt(i);
  }

  res.json({ result });
});
```

This is completely different from:

```js
await db.query(...)
```

The database query spends most of its time **outside JavaScript**.

The loop spends its time **executing JavaScript on the main thread**.

So the call stack stays occupied:

```text
Main JavaScript thread

0ms
 │
 │  CPU calculation
 │
 │  CPU calculation
 │
 │  CPU calculation
 │
 │  CPU calculation
 │
 │  CPU calculation
 │
 ▼
5000ms
```

During that time:

```text
Request A → CPU work ██████████████████████████

Request B → waiting...
Request C → waiting...
Request D → waiting...
Request E → waiting...
```

The event loop cannot simply interrupt your JavaScript and run request B.

That's the weakness of Node's single-threaded JavaScript model.

---

# 9. `async` does NOT magically fix CPU work

This is extremely important.

Writing:

```js
async function calculate() {
  for (let i = 0; i < 10_000_000_000; i++) {
    // expensive calculation
  }
}
```

doesn't make the calculation asynchronous.

Neither does:

```js
await calculate();
```

If `calculate()` performs synchronous CPU work, the JavaScript thread is still blocked.

`async/await` is primarily a convenient way to **express asynchronous control flow**. It doesn't automatically move computation to another thread.

---

# 10. What do we do with CPU-heavy work?

For genuinely expensive CPU work, you usually want it away from the main event-loop thread.

Node provides **Worker Threads**, for example:

```text
                 Main JS Thread
                       │
              ┌────────┴────────┐
              │                 │
         Worker Thread     Worker Thread
              │                 │
         CPU-heavy          CPU-heavy
         calculation        calculation
```

Depending on the architecture, you might also use separate processes or external job-processing services.

This allows the main Node thread to remain responsive to incoming requests.

---

# The complete mental model

Connect everything you mentioned into one chain:

```text
                    NODE.JS
                       │
                       ▼
          Single JavaScript Thread
                       │
                       ▼
                  Call Stack
                       │
             executes JS code
                       │
              ┌────────┴─────────┐
              │                  │
           I/O work          CPU work
              │                  │
              ▼                  ▼
       asynchronous          stays on
          operation          call stack
              │                  │
              ▼                  ▼
         OS / libuv          BLOCKS JS
              │
              ▼
      database/network/etc.
              │
              │ waiting...
              │
        JS thread is free
              │
              ▼
      handles other requests
              │
              ▼
         I/O completes
              │
              ▼
       Promise settles
              │
              ▼
       Promise microtask
              │
              ▼
         Event loop
              │
              ▼
       JS continues after
             await
```

So when someone asks you:

**"If JavaScript is single-threaded, how can Node handle 10,000 concurrent requests?"**

A strong answer is:

> Node executes JavaScript primarily on a single thread, but it doesn't perform all the waiting on that thread. When a request starts asynchronous I/O, such as a database or network operation, Node delegates the underlying work to the OS/libuv and frees the JavaScript thread to process other requests. When the I/O completes, the event loop allows the associated JavaScript to continue; with Promises, the continuation after `await` runs as a microtask. This makes Node excellent at handling many concurrent I/O-bound operations. However, CPU-heavy synchronous JavaScript occupies the main thread and blocks the event loop, so expensive computation should generally be moved to worker threads or another process.

### One rule to remember

**Node is good at handling lots of waiting, not lots of CPU computation.**

10,000 requests that are mostly waiting for databases/network calls can be manageable.

One request doing several seconds of synchronous CPU work can make **all 10,000 requests feel slow**.

This example gets to the most important distinction in Node.js: **waiting time vs CPU execution time**.

Consider:

```js
async function getUser() {
  const user = await db.findUser(4821);
  return user;
}
```

Suppose the database takes **200 ms** to return the user.

## 1. `getUser()` starts executing

When something calls:

```js
getUser();
```

JavaScript begins executing `getUser()` on Node's main JavaScript thread.

So conceptually:

```text
Main JavaScript Thread

Call Stack
┌─────────────────┐
│ getUser()       │
└─────────────────┘
```

Then it reaches:

```js
db.findUser(4821);
```

The database library starts the database operation.

Eventually, a network request needs to be sent to MySQL.

---

## 2. `db.findUser()` returns a Promise

Because the database operation isn't finished yet, `db.findUser()` gives JavaScript a **Promise representing the future result**.

Conceptually:

```text
db.findUser(4821)

        │
        ▼

Promise
state: pending
result: ???
```

Then JavaScript encounters:

```js
await <pending Promise>
```

This is the critical moment.

`await` effectively says:

> "I can't continue this function until this Promise settles."

But it does **not** say:

> "Block the entire JavaScript thread until it settles."

Instead, execution of **this particular async function is suspended**.

---

## 3. `getUser()` leaves the call stack

Because `getUser()` can't continue yet, it yields control.

The call stack becomes available:

```text
Before await:

Call Stack
┌─────────────────┐
│ getUser()       │
└─────────────────┘


After await:

Call Stack
┌─────────────────┐
│                 │
│      empty      │
│                 │
└─────────────────┘
```

This is one of the central ideas behind Node.js concurrency.

**`getUser()` is waiting, but the JavaScript thread isn't.**

The function's execution state is preserved so it can continue later.

---

# 4. So who is waiting for MySQL?

Not the JavaScript call stack.

The underlying database connection is a **network socket**.

At a simplified level:

```text
Your JavaScript
      │
      │ db.findUser(4821)
      ▼
Database library
      │
      ▼
Node / libuv
      │
      ▼
Operating System
      │
      │ network socket
      ▼
    MySQL
```

The OS can monitor the socket and notify Node when data becomes available.

This is an important detail: for network I/O, Node generally isn't dedicating a JavaScript thread—or even necessarily one libuv worker thread—to sit there for 200 ms doing:

```text
Is MySQL done?
No.

Is MySQL done?
No.

Is MySQL done?
No.
```

The operating system has efficient mechanisms for monitoring many network connections.

So while MySQL spends 200 ms doing things such as processing the query, accessing data, and sending the result back, **Node's JavaScript thread is free**.

---

# 5. What does the event loop do during those 200 ms?

It can keep processing other ready work.

Suppose these requests arrive:

```text
Request A → getUser(4821)
Request B → getOrders()
Request C → getProducts()
Request D → updateProfile()
```

Request A starts:

```text
Request A
    │
    ▼
getUser()
    │
    ▼
db.findUser()
    │
    ▼
await Promise
```

Now `getUser()` is suspended.

The call stack becomes available.

Node can process request B:

```text
Call Stack

┌─────────────────┐
│ getOrders()     │
└─────────────────┘
```

Maybe it also reaches a database query and `await`s.

Now request C can run.

Then D.

So after a short time, you could have:

```text
MySQL / Network

Request A ───────────── waiting ────────────
Request B ───────────────── waiting ─────────────
Request C ─────── waiting ───────
Request D ─────────── waiting ──────────


JavaScript thread

A → B → C → D → other ready work...
```

This is **concurrency**.

The JavaScript isn't executing A, B, C, and D simultaneously.

Instead, it quickly starts work, reaches asynchronous waiting points, and moves on.

---

# 6. 200 ms later, MySQL responds

Eventually MySQL sends the result:

```text
MySQL
  │
  │ user data
  ▼
Network
  │
  ▼
Operating System
  │
  ▼
Node / database driver
```

Node learns that data is available on the socket.

The database driver processes the response and the Promise returned by:

```js
db.findUser(4821);
```

eventually becomes fulfilled.

Conceptually:

```text
Before:

Promise
┌──────────────────┐
│ pending          │
└──────────────────┘


After:

Promise
┌──────────────────┐
│ fulfilled        │
│ value: user      │
└──────────────────┘
```

---

# 7. What happens to the code after `await`?

Remember that this code was suspended:

```js
const user = await db.findUser(4821);
return user;
```

Once the Promise settles, the continuation of the async function becomes eligible to run.

Promise reactions are handled through the **microtask queue**.

Conceptually:

```text
MySQL response
      │
      ▼
I/O completion processed
      │
      ▼
Promise fulfilled
      │
      ▼
Microtask queued
      │
      ▼
JavaScript gets opportunity
to process microtasks
      │
      ▼
getUser() resumes
```

Now `getUser()` comes back onto the JavaScript execution path and continues **after the `await`**:

```js
const user = await db.findUser(4821);

// resumes here
return user;
```

The `user` variable receives the Promise's fulfilled value.

Then:

```js
return user;
```

runs normally on the JavaScript thread.

Because `getUser()` itself is `async`, its returned Promise is fulfilled with that value.

---

# The whole 200 ms timeline

Think of it like this:

```text
Time ───────────────────────────────────────────────►

0ms                                               200ms

JS:
│
│ getUser()
│
│ db.findUser()
│
│ await
▼
SUSPENDED
                                                    │
                                                    │ Promise settled
                                                    ▼
                                                getUser()
                                                resumes
                                                    │
                                                    ▼
                                              return user


MySQL:

      ├─────────────────────────────────────────────┤
                processing / network waiting


JS thread:

      ├─────────────────────────────────────────────┤
        FREE TO PROCESS OTHER JAVASCRIPT
```

The key sentence is:

> **The request takes 200 ms, but JavaScript does not spend 200 ms executing that request.**

Maybe JavaScript spends:

```text
Before DB request:       1 ms
Waiting for MySQL:     200 ms
After response:          1 ms
                       ──────
Request duration:      ~202 ms
Actual JS execution:    ~2 ms
```

That's why Node can have many requests in flight.

---

# Now compare it with CPU-heavy work

Consider:

```js
let sum = 0;

for (let i = 0; i < 10_000_000_000; i++) {
  sum += i;
}
```

This is fundamentally different.

There is:

- no network request
- no database
- no pending Promise
- no `await`
- no asynchronous I/O to hand off
- no point where the function yields

JavaScript itself must execute:

```js
sum += i;
```

billions of times.

So the call stack remains occupied.

```text
Call Stack

┌─────────────────────────────┐
│                             │
│ huge CPU loop               │
│                             │
│ i = 1                       │
│ i = 2                       │
│ i = 3                       │
│ ...                         │
│ i = 9,999,999,999           │
│                             │
└─────────────────────────────┘
```

Suppose that loop takes 5 seconds.

For those 5 seconds:

```text
Main JS Thread

████████████████████████████████████████████
             CPU LOOP
████████████████████████████████████████████

0s                                         5s
```

The event loop can't just say:

> "This is taking a while. I'll pause it and handle another HTTP request."

Your synchronous JavaScript currently owns the thread.

Other JavaScript has to wait.

```text
CPU loop       █████████████████████████████

Request B      .............................→ waiting
Request C      .............................→ waiting
Timer callback .............................→ waiting
Promise work   .............................→ waiting
Request D      .............................→ waiting
```

Even if network responses become ready during this time, their JavaScript callbacks cannot execute until the main thread becomes available.

---

# MySQL waiting vs CPU loop

This is the distinction worth memorizing:

| 200 ms MySQL query                | 200 ms CPU calculation         |
| --------------------------------- | ------------------------------ |
| Mostly waiting                    | Actively computing             |
| Asynchronous I/O                  | Synchronous CPU work           |
| JS function can suspend           | JS keeps executing             |
| Call stack becomes free           | Call stack stays occupied      |
| OS can monitor network socket     | JS thread performs calculation |
| Event loop can process other work | Event loop can't run other JS  |
| Good for Node's concurrency model | Can block Node's main thread   |

So:

```js
await db.findUser(4821);
```

taking **200 ms** doesn't mean:

> "JavaScript is busy for 200 ms."

It means roughly:

> "Start the operation, suspend this function, and continue it when the result is available."

But:

```js
for (let i = 0; i < 10_000_000_000; i++) {
  sum += i;
}
```

taking **200 ms** means:

> "The JavaScript thread is actually executing instructions for 200 ms."

That's the fundamental difference.

## The mental model to keep

```text
          Is JavaScript doing work?
                  │
          ┌───────┴───────┐
          │               │
         NO              YES
          │               │
     Waiting for       CPU work
       I/O               │
          │               │
          ▼               ▼
   JS thread free    JS thread busy
          │               │
          ▼               ▼
   Other requests    Other requests
      can run           must wait
```

So when thinking about Node.js performance, ask yourself:

> **"Is my program waiting for something, or is JavaScript itself doing something?"**

Waiting **200 ms for MySQL** is usually fine for the event loop because the JavaScript thread can do other work.

Spending **200 ms calculating something in JavaScript** is dangerous because, during those 200 ms, you've effectively frozen the main JavaScript thread.
