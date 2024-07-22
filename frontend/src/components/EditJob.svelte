<script lang="ts">
  import { CloseOutline } from "flowbite-svelte-icons";
  import { createEventDispatcher } from "svelte";
  import { employment } from "../lib/employment";
  import { location } from "../lib/location";
  import { level } from "../lib/level";
  import { formSchema, type FormSchema } from "../schemas/jobSchema";
  import type { IJob } from "../types/types";
  import { AxiosError } from "axios";
  import { updateJob } from "../services/job.services";
  import Toast from "../components/Toast.svelte";

  export let showModal = false;
  export let job: Partial<IJob>;
  export let messageBtn: string;

  const dispatch = createEventDispatcher();
  let errors: Partial<FormSchema> = {};
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

  function success() {
    showModal = !showModal;
    dispatch("success");
  }

  $: if (showModal) {
    openModal();
  }

  async function handleFormSubmission() {
    try {
      formSchema.parse(job);
      errors = {};

      const body = {
        title: job.title,
        company: job.company,
        employment: job.employment,
        location: job.location,
        salary: job.salary,
        description: job.description,
        inthisrole: job.inthisrole,
        skills: job.skills,
        level: job.level,
      };

      //@ts-ignore
      const { data } = await updateJob(job._id, body);
      showToast("success", data.message);
      success();
    } catch (error) {
      if (error instanceof AxiosError) {
        showToast("success", error.response?.data.message);
      }
    }
  }
</script>

<Toast {toastStatus} {toastIcon} {message} />

<div class="p-4 mt-10 mb-14" class:hidden={!showModal}>
  <div class="grid gap-y-4">
    <div class="flex justify-end">
      <button class="" on:click={closeModal}> <CloseOutline /> </button>
    </div>

    <div>
      <label class="prompt-extralight text-xs" for="">Job Title</label>
      <input
        class="prompt-extralight w-full rounded-lg border px-2 py-2"
        type="text"
        bind:value={job.title}
      />
      {#if errors.title}
        <p class="text-red-500 prompt-extralight text-xs">{errors.title}</p>
      {/if}
    </div>

    <div>
      <label class="prompt-extralight text-xs" for="">Company</label>
      <input
        class="prompt-extralight w-full rounded-lg border px-2 py-2"
        type="text"
        bind:value={job.company}
      />
      {#if errors.company}
        <p class="text-red-500 prompt-extralight text-xs">{errors.company}</p>
      {/if}
    </div>

    <div>
      <label class="prompt-extralight text-xs" for="">Employment type</label>
      <select
        bind:value={job.employment}
        class="px-2 py-2 prompt-extralight text-black w-full border rounded-md"
      >
        {#each employment as { value, name }}
          <option class="prompt-extralight text-black" {value}>{name}</option>
        {/each}
      </select>

      {#if errors.employment}
        <p class="text-red-500 prompt-extralight text-xs">
          {errors.employment}
        </p>
      {/if}
    </div>

    <div>
      <label class="prompt-extralight text-xs" for="">Location preference</label
      >
      <select
        bind:value={job.location}
        class="px-2 py-2 prompt-extralight text-black w-full border rounded-md"
      >
        {#each location as { value, name }}
          <option class="prompt-extralight text-black" {value}>{name}</option>
        {/each}
      </select>
      {#if errors.location}
        <p class="text-red-500 prompt-extralight text-xs">
          {errors.location}
        </p>
      {/if}
    </div>

    <div>
      <label class="prompt-extralight text-xs" for="">Level</label>
      <select
        bind:value={job.level}
        class="px-2 py-2 prompt-extralight text-black w-full border rounded-md"
      >
        {#each level as { value, name }}
          <option class="prompt-extralight text-black" {value}>{name}</option>
        {/each}
      </select>
      {#if errors.level}
        <p class="text-red-500 prompt-extralight text-xs">
          {errors.level}
        </p>
      {/if}
    </div>

    <div>
      <label class="prompt-extralight text-xs" for="">Annual salary</label>
      <input
        class="prompt-extralight w-full rounded-lg border px-2 py-2"
        type="number"
        bind:value={job.salary}
      />
      {#if errors.salary}
        <p class="text-red-500 prompt-extralight text-xs">
          {errors.salary}
        </p>
      {/if}
    </div>

    <div class="grid">
      <label class="prompt-extralight text-xs" for="">Description</label>
      <textarea
        name=""
        id=""
        rows="2"
        class="prompt-extralight rounded-lg border p-2"
        bind:value={job.description}
      ></textarea>
      {#if errors.description}
        <p class="text-red-500 prompt-extralight text-xs">
          {errors.description}
        </p>
      {/if}
    </div>

    <div class="grid">
      <label class="prompt-extralight text-xs" for=""
        >In this role, what do you expect from the candidate?</label
      >
      <textarea
        name=""
        id=""
        rows="2"
        class="prompt-extralight rounded-lg border p-2"
        bind:value={job.inthisrole}
      ></textarea>
      {#if errors.inthisrole}
        <p class="text-red-500 prompt-extralight text-xs">
          {errors.inthisrole}
        </p>
      {/if}
    </div>

    <div class="grid">
      <label class="prompt-extralight text-xs" for=""
        >Skills and Experience
      </label>
      <textarea
        name=""
        id=""
        rows="2"
        class="prompt-extralight rounded-lg border p-2"
        bind:value={job.skills}
      ></textarea>
      {#if errors.skills}
        <p class="text-red-500 prompt-extralight text-xs">
          {errors.skills}
        </p>
      {/if}
    </div>

    <div>
      <button
        on:click={handleFormSubmission}
        class="bg-[#252526] w-full py-3 rounded-lg text-white prompt-semibold"
        >{messageBtn}</button
      >
    </div>
  </div>
</div>
