<script lang="ts">
  import { Route, Router } from "svelte-routing";
  import Dashboard from "./routes/Dashboard.svelte";
  import Home from "./routes/Home.svelte";
  import ProtectedRoute from "./routes/ProtectedRoute.svelte";
  import PublicRoute from "./routes/PublicRoute.svelte";
  import Signin from "./routes/Signin.svelte";
  import Signup from "./routes/Signup.svelte";
</script>

<Router>
  <Route path="/" component={Home} />

  <Route path="/signin">
    <PublicRoute component={Signin} />
  </Route>
  <Route path="/signup">
    <PublicRoute component={Signup} />
  </Route>

  <Route path="/dashboard">
    <ProtectedRoute component={Dashboard} />
  </Route>
</Router>

<!-- <div class="grid place-items-center">
  <div class="w-full justify-start p-4 xl:w-1/4">
    <h1 class="prompt-semibold text-[#4a485d]">JOBSNAP</h1>
  </div>
</div>
<div class="grid h-screen place-items-center">
  <div class="grid w-full gap-y-6 p-4 xl:w-1/4">
    <div>
      <img
        src="https://images.playground.com/385a63e8699e4c7fadd1c1cea682b823.png"
        alt=""
      />
    </div>
    <div>
      <h2 class="prompt-semibold text-4xl">
        Over <span class="text-[#4969d6]">5,000 Jobs</span> are waiting for you
      </h2>
    </div>
    <div>
      <button
        class="prompt-extralight w-full rounded-xl bg-[#242240] py-3 text-white cursor-pointer"
        >Start searching</button
      >
    </div>
  </div>
</div> -->

<!-- <div>
  <div class="grid gap-y-6 p-4">
    <div>
      <h2 class="prompt-semibold">Select your job catergory</h2>
      <p class="prompt-extralight text-xs">
        Select one or more categories suitable for your searh
      </p>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div
        class="grid cursor-pointer place-items-center gap-y-4 rounded-lg border border-[#4968d7] p-4 shadow-sm transition-all hover:scale-105"
      >
        <div class="rounded-full bg-[#4968d7] p-2">
          <svg
            class="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
            />
          </svg>
        </div>
        <h3 class="prompt-semibold text-xs">Marketing</h3>
      </div>

      <div
        class="grid cursor-pointer place-items-center gap-y-4 rounded-lg border p-4 shadow-sm transition-all hover:scale-105"
      >
        <div class="rounded-full bg-[#ecedef] p-2">
          <svg
            class="h-8 w-8 text-neutral-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </div>
        <h3 class="prompt-extralight text-xs">Public Relations</h3>
      </div>

      <div
        class="grid cursor-pointer place-items-center gap-y-4 rounded-lg border p-4 shadow-sm transition-all hover:scale-105"
      >
        <div class="rounded-full bg-[#ecedef] p-2">
          <svg
            class="h-8 w-8 text-neutral-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <h3 class="prompt-extralight text-xs">HR</h3>
      </div>

      <div
        class="grid cursor-pointer place-items-center gap-y-4 rounded-lg border border-[#4968d7] p-4 shadow-sm transition-all hover:scale-105"
      >
        <div class="rounded-full bg-[#4968d7] p-2">
          <svg
            class="h-8 w-8 text-white"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <line x1="4" y1="19" x2="20" y2="19" />
            <polyline points="4 15 8 9 12 11 16 6 20 10" />
          </svg>
        </div>
        <h3 class="prompt-semibold text-xs">Sales</h3>
      </div>

      <div
        class="grid cursor-pointer place-items-center gap-y-4 rounded-lg border p-4 shadow-sm transition-all hover:scale-105"
      >
        <div class="rounded-full bg-[#ecedef] p-2">
          <svg
            class="h-8 w-8 text-neutral-500"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <line x1="3" y1="19" x2="21" y2="19" />
            <rect x="5" y="6" width="14" height="10" rx="1" />
          </svg>
        </div>
        <h3 class="prompt-extralight text-xs">IT</h3>
      </div>

      <div
        class="grid cursor-pointer place-items-center gap-y-4 rounded-lg border p-4 shadow-sm transition-all hover:scale-105"
      >
        <div class="rounded-full bg-[#ecedef] p-2">
          <svg
            class="h-8 w-8 text-neutral-500"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <path
              d="M12 21a9 9 0 1 1 0 -18a9 8 0 0 1 9 8a4.5 4 0 0 1 -4.5 4h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25"
            />
            <circle cx="7.5" cy="10.5" r=".5" fill="currentColor" />
            <circle cx="12" cy="7.5" r=".5" fill="currentColor" />
            <circle cx="16.5" cy="10.5" r=".5" fill="currentColor" />
          </svg>
        </div>
        <h3 class="prompt-extralight text-xs">Design</h3>
      </div>

      <div
        class="grid cursor-pointer place-items-center gap-y-4 rounded-lg border p-4 shadow-sm transition-all hover:scale-105"
      >
        <div class="rounded-full bg-[#ecedef] p-2">
          <svg
            class="h-8 w-8 text-neutral-500"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <circle cx="9" cy="19" r="2" />
            <circle cx="17" cy="19" r="2" />
            <path d="M3 3h2l2 12a3 3 0 0 0 3 2h7a3 3 0 0 0 3 -2l1 -7h-15.2" />
          </svg>
        </div>
        <h3 class="prompt-extralight text-xs">shopper</h3>
      </div>

      <div
        class="grid cursor-pointer place-items-center gap-y-4 rounded-lg border p-4 shadow-sm transition-all hover:scale-105"
      >
        <div class="rounded-full bg-[#ecedef] p-2">
          <svg
            class="h-8 w-8 text-neutral-500"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <circle cx="7" cy="17" r="2" />
            <circle cx="17" cy="17" r="2" />
            <path
              d="M5 17h-2v-11a1 1 0 0 1 1 -1h9v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5"
            />
          </svg>
        </div>
        <h3 class="prompt-extralight text-xs">Driver</h3>
      </div>

      <div
        class="grid cursor-pointer place-items-center gap-y-4 rounded-lg border p-4 shadow-sm transition-all hover:scale-105"
      >
        <div class="rounded-full bg-[#ecedef] p-2">
          <svg
            class="h-8 w-8 text-neutral-500"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <line x1="3" y1="21" x2="21" y2="21" />
            <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16" />
            <path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" />
            <line x1="10" y1="9" x2="14" y2="9" />
            <line x1="12" y1="7" x2="12" y2="11" />
          </svg>
        </div>
        <h3 class="prompt-extralight text-xs">Medicine</h3>
      </div>

      <div
        class="grid cursor-pointer place-items-center gap-y-4 rounded-lg border p-4 shadow-sm transition-all hover:scale-105"
      >
        <div class="rounded-full bg-[#ecedef] p-2">
          <svg
            class="h-8 w-8 text-neutral-500"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <circle cx="5" cy="17" r="2" />
            <circle cx="17" cy="17" r="2" />
            <path d="M7 18h8m4 0h2v-6a5 5 0 0 0 -5 -5h-1l1.5 5h4.5" />
            <path d="M12 18v-11h3" />
            <polyline points="3 17 3 12 12 12" />
            <line x1="3" y1="9" x2="21" y2="3" />
            <line x1="6" y1="12" x2="6" y2="8" />
          </svg>
        </div>
        <h3 class="prompt-extralight text-xs">Construction</h3>
      </div>
    </div>

    <div>
      <button
        class="prompt-semibold w-full rounded-lg bg-[#242426] py-3 text-xs text-white"
        >Find jobs</button
      >
    </div>
  </div>
</div> -->
