{#each toasts as toast (toast.id)}
  <div
    class="toast"
    class:toast-success={toast.type === 'success'}
    class:toast-error={toast.type === 'error'}
    class:toast-info={toast.type === 'info'}
    class:toast-warning={toast.type === 'warning'}
    in:fly={{ y: 50, duration: 300 }}
    out:fly={{ y: -50, duration: 300 }}
  >
    <div class="alert" role="alert">
      <span>{toast.message}</span>
    </div>
  </div>
{/each}

<script>
  import { fly } from "svelte/transition";
  import { toastStore } from "$lib/stores/toastStore";
  import { onDestroy } from "svelte";

  let toasts  = [];

  // Subscribe ค่า toast จาก store
  const unsubscribe = toastStore.subscribe(value => {
    toasts = value;
  });

  onDestroy(unsubscribe);
</script>

<style>
  .toast {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    z-index: 1000;
    width: 350px;
  }

  .toast:not(:last-child) {
    margin-bottom: 0.5rem; /* ให้แต่ละ toast ห่างกัน */
  }

  .alert {
    padding: 1rem;
    border-radius: 0.5rem;
    color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }

  .toast-success .alert {
    background-color: #48bb78;
  }

  .toast-error .alert {
    background-color: #f56565;
  }

  .toast-info .alert {
    background-color: #4299e1;
  }

  .toast-warning .alert {
    background-color: #ed8936;
  }
</style>
