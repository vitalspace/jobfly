<script lang="ts">
  import { AxiosError } from "axios";
  import { navigate } from "svelte-routing";
  import { z } from "zod";
  import Menu from "../components/Menu.svelte";
  import Toast from "../components/Toast.svelte";
  import { employment } from "../lib/employment";
  import { location } from "../lib/location";
  import { level } from "../lib/level";
  import { formSchema, type FormSchema } from "../schemas/jobSchema";
  import { createJob } from "../services/job.services";
  import type { IJob } from "../types/types";

  let formData: Partial<IJob> = {
    title: "",
    company: "",
    employment: "Full time",
    location: "Precential",
    salary: 0,
    description: "",
    inthisrole: "",
    skills: "",
    level: "Jr",
  };

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

  async function handleFormSubmission() {
    try {
      formSchema.parse(formData);
      errors = {};
      const { data } = await createJob(formData);
      showToast("success", data.message);
      setTimeout(() => {
        navigate("/dashboard");
      }, TOAST_DURATION);
    } catch (error) {
      if (error instanceof z.ZodError) {
        errors = error.formErrors.fieldErrors as Partial<FormSchema>;
      } else if (error instanceof AxiosError) {
        showToast("error", error.response?.data.message);
      }
    }
  }
</script>

<Menu hiddeHistory={false} />
<Toast {toastStatus} {toastIcon} {message} />

<div class="p-4 mt-10 mb-14">
  <div class="grid gap-y-4">
    <div>
      <label class="prompt-extralight text-xs" for="">Job Title</label>
      <input
        class="prompt-extralight w-full rounded-lg border px-2 py-2"
        type="text"
        bind:value={formData.title}
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
        bind:value={formData.company}
      />
      {#if errors.company}
        <p class="text-red-500 prompt-extralight text-xs">{errors.company}</p>
      {/if}
    </div>

    <div>
      <label class="prompt-extralight text-xs" for="">Employment type</label>
      <select
        bind:value={formData.employment}
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
        bind:value={formData.location}
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
        bind:value={formData.level}
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
        bind:value={formData.salary}
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
        bind:value={formData.description}
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
        bind:value={formData.inthisrole}
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
        bind:value={formData.skills}
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
        >Submit Job</button
      >
    </div>
  </div>
</div>
