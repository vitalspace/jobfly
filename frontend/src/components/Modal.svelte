<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Toast from "./Toast.svelte";
  import {
    CloseOutline,
    CircleMinusSolid,
    FlagSolid,
  } from "flowbite-svelte-icons";

  import { unApply } from "../services/user.services";
  import { AxiosError } from "axios";
  import { userStore } from "../stores/user.store";

  export let showModal = false;
  export let id: string;
  const dispatch = createEventDispatcher();

  let message = "";
  let toastStatus = false;
  const TOAST_DURATION = 3000;
  let toastIcon: "success" | "error" = "success";

  const showToast = (icon: "success" | "error", msg: string) => {
    toastStatus = true;
    toastIcon = icon;
    message = msg;
    setTimeout(() => (toastStatus = false), TOAST_DURATION);
  };

  function openModal() {
    dispatch("open");
  }

  function closeModal() {
    dispatch("close");
  }

  $: if (showModal) {
    openModal();
  }

  async function handleFirstClick() {
    try {
      const response = await unApply({ id });
      showToast("success", response.data.message);
      userStore.initialize();
    } catch (error) {
      if (error instanceof AxiosError) {
        showToast("error", error.response?.data.message);
      }
    }
  }

  function handleSecondClick() {
    alert(`Second item clicked with id: ${id}`);
  }
</script>

<Toast {toastStatus} {toastIcon} {message} />

<div
  class="fixed z-10 inset-0 grid place-items-center p-4"
  class:hidden={!showModal}
>
  <div class="absolute inset-0 bg-black opacity-80"></div>
  <div class="grid gap-y-4 w-full shadow-md bg-white rounded-lg p-2 z-20">
    <div class="flex place-items-center justify-between">
      <h2 class="prompt-semibold">Manage this application</h2>
      <button on:click={closeModal}>
        <CloseOutline />
      </button>
    </div>
    <ul class="grid gap-2">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <li class="flex place-items-center space-x-2">
        <CircleMinusSolid color="#252526" />
        <button
          class="cursor-pointer transition-all border-b-2 border-b-transparent hover:border-b-2 hover:border-[#597ae8] text-left"
          on:click={handleFirstClick}
        >
          <span class="prompt-extralight">Withdraw postulation</span>
        </button>
      </li>
      <li class="flex place-items-center space-x-2">
        <FlagSolid color="#252526" />
        <button
          class="cursor-pointer transition-all border-b-2 border-b-transparent hover:border-b-2 hover:border-[#597ae8] text-left"
          on:click={handleSecondClick}
        >
          <span class="prompt-extralight">Report employment</span>
        </button>
      </li>
    </ul>
  </div>
</div>
