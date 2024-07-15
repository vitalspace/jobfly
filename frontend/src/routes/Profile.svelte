<script lang="ts">
  import { onMount } from "svelte";
  import Menu from "../components/Menu.svelte";
  import { userStore } from "../stores/user.store";
  import { type IUser } from "../types/types.d";

  let editProfileStatus = false;

  let formData: Partial<IUser> = {
    avatar: "",
    fullname: "",
    location: "",
    email: "",
    age: null,
    phone: "",
  };

  onMount(() => {
    userStore.subscribe((v) => {
      formData.avatar = v.avatar;
      formData.fullname = v.fullname;
      formData.location = v.location;
      formData.email = v.email;
      formData.age = v.age;
      formData.phone = v.phone;
    });
  });

  function showEditProfile() {
    editProfileStatus = !editProfileStatus;
  }
</script>

<div class="grid h-screen place-items-center">
  {#if !editProfileStatus}
    <div class="grid w-full place-items-center gap-y-4 p-4">
      <div class="grid place-items-center rounded-full p-2 shadow-md">
        {#if formData.avatar != ""}
          <h2 class="">mi</h2>
        {:else}
          <svg
            class="h-40 w-40 text-black"
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
            <circle cx="12" cy="7" r="4" />
            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
          </svg>
        {/if}
      </div>
      <div class="text-center">
        <h2 class="prompt-semibold text-xl text-[#2b2b2b]">
          {formData.fullname}
        </h2>
        <p class="prompt-extralight text-sm text-[#2b2b2b]">Web Developer</p>
        <p class="prompt-extralight text-sm text-[#2b2b2b]">{formData.email}</p>
      </div>

      <div>
        <button
          on:click={showEditProfile}
          class="prompt-semibold rounded-md bg-[#252526] px-4 py-2 text-sm text-white shadow-md"
          >Edit Profile</button
        >
      </div>

      <div class="grid w-full gap-y-6 rounded-lg bg-[#6387F2] p-4 shadow-md">
        <div>
          <div class="flex place-items-center space-x-2">
            <div class="bg-[#4968d7] p-1 rounded-lg">
              <svg
                class="h-5 w-5 text-white"
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
                  d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6"
                />
                <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
              </svg>
            </div>
            <h2 class="prompt-semibold text-xs text-white">
              Turn on Notifications
            </h2>
          </div>
        </div>

        <div>
          <div class="flex place-items-center space-x-2">
            <div class="bg-[#4968d7] p-1 rounded-lg">
              <svg
                class="h-5 w-5 text-white"
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
                <rect x="4" y="4" width="6" height="6" rx="1" />
                <line x1="7" y1="17" x2="7" y2="17.01" />
                <rect x="14" y="4" width="6" height="6" rx="1" />
                <line x1="7" y1="7" x2="7" y2="7.01" />
                <rect x="4" y="14" width="6" height="6" rx="1" />
                <line x1="17" y1="7" x2="17" y2="7.01" />
                <line x1="14" y1="14" x2="17" y2="14" />
                <line x1="20" y1="14" x2="20" y2="14.01" />
                <line x1="14" y1="14" x2="14" y2="17" />
                <line x1="14" y1="20" x2="17" y2="20" />
                <line x1="17" y1="17" x2="20" y2="17" />
                <line x1="20" y1="17" x2="20" y2="20" />
              </svg>
            </div>
            <h2 class="prompt-semibold text-xs text-white">Invite people</h2>
          </div>
        </div>
      </div>
    </div>
  {:else}
    <div class="grid gap-6 p-4 w-full">
      <div class="grid gap-y-6 text-center">
        <div>
          <h2 class="prompt-semibold text-sm">Fill out your profile</h2>
        </div>
        <div class="grid place-items-center gap-2">
          <div class="flex place-items-end">
            <div class="rounded-full border-2 p-2">
              <svg
                class="h-20 w-20 text-[#252526]"
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
                <circle cx="12" cy="7" r="4" />
                <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
              </svg>
            </div>
            <div class="absolute cursor-pointer pl-16">
              <div class="rounded-full border border-white bg-[#4968d7]">
                <svg
                  class="h-6 w-6 text-white"
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
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </div>
            </div>
          </div>
          <p class="prompt-extralight text-xs">Upload a photo</p>
        </div>
      </div>

      <div>
        <form action="" class="flex flex-col gap-y-2">
          <label for="" class="prompt-extralight text-xs">Full name</label>
          <input
            class="prompt-extralight rounded-xl border py-2 pl-2"
            type="text"
            bind:value={formData.fullname}
          />

          <label for="" class="prompt-extralight text-xs">Age</label>
          <input
            class="prompt-extralight rounded-xl border py-2 pl-2"
            type="text"
            bind:value={formData.age}
          />

          <label for="" class="prompt-extralight text-xs">Location</label>
          <input
            class="prompt-extralight rounded-xl border py-2 pl-2"
            type="text"
            bind:value={formData.location}
          />

          <label for="" class="prompt-extralight text-xs">Phone</label>
          <input
            class="prompt-extralight rounded-xl border py-2 pl-2"
            type="text"
            bind:value={formData.phone}
          />

          <label for="" class="prompt-extralight text-xs">Email</label>
          <input
            class="prompt-extralight rounded-xl border py-2 pl-2"
            type="text"
            bind:value={formData.email}
          />

          <!-- <label for="" class="prompt-extralight text-xs">Password</label>
          <input
            class="prompt-extralight rounded-xl border py-2 pl-2"
            type="text"
          /> -->
        </form>
      </div>

      <div class="">
        <button
          class="prompt-semibold w-full rounded-xl bg-[#252526] py-3 text-sm text-white"
          >Submit</button
        >
      </div>

      <div class="w-full text-center">
        <button on:click={showEditProfile} class="text-red-300 prompt-semibold"
          >Cancel</button
        >
      </div>
    </div>
  {/if}
</div>

<Menu />
