<script lang="ts">
  import "../app.css";
  import "@fortawesome/fontawesome-free/css/all.min.css";
  import { authStore } from '$lib/stores/authStore';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  import Header from "../components/Header.svelte";
  import Sidebar from "../components/Sidebar.svelte";
  import Footer from "../components/Footer.svelte";
  import Breadcrumb from "../components/Breadcrumb.svelte";

  interface Link {
    href: string;
    text: string;
    icon: string;
    submenu?: Link[];
  }

  const navLinks: Link[] = [
    { href: "/home", text: "หน้าหลัก", icon: "fa-solid fa-house" },
    {
      href: "/contract",
      text: "สัญญา",
      icon: "fa-solid fa-cogs",
      submenu: [
        { href: "/contract/GeneralSalesContract", text: "สัญญาซื้อขายทั่วไป", icon: "fa-solid fa-file" },
        { href: "/contract/CornSalesContract", text: "สัญญาซื้อขายข้าวโพด", icon: "fa-solid fa-file" },
        { href: "/contract/ContractFarmingAgreement", text: "สัญญาจ้างเลี้ยง", icon: "fa-solid fa-file" },
      ],
    },
    {
      href: "/communityEnterprise",
      text: "วิสาหกิจชุมชน",
      icon: "fa-solid fa-gavel",
      submenu: [
        { href: "/communityEnterprise/GeneralPetitionForm", text: "แบบคำร้องทั่วไป", icon: "fa-solid fa-file" },
        { href: "/communityEnterprise/BusinessPlan", text: "แผนประกอบการ", icon: "fa-solid fa-file" },
        { href: "/communityEnterprise/OperationResults", text: "ผลการดำเนินงาน", icon: "fa-solid fa-file" },
      ],
    },
    {
      href: "/officers",
      text: "หน่วยงานที่เกี่ยวข้อง",
      icon: "fa-solid fa-phone",
    },
    { href: "/about", text: "คณะผู้จัดทำ", icon: "fa-solid fa-info-circle" },
  ];

  let breadcrumbPath: { href: string; text: string }[] = [];

  function handleMenuClick(event: CustomEvent<{ href: string; text: string }>) {
    breadcrumbPath = [{ href: event.detail.href, text: event.detail.text }];
  }

  let isSidebarOpen = false;

  function toggleSidebar() {
    isSidebarOpen = !isSidebarOpen;
  }
  
  $: {
    if (browser && !$authStore.loading && !$authStore.isAuthenticated) {
      const publicPaths = ['/', '/login'];
      const isPublicPath = publicPaths.some(path => $page.url.pathname === path || $page.url.pathname.startsWith('/auth'));
      
      if (!isPublicPath) {
        window.location.replace('/'); 
      }
    }
  }
  
  onMount(() => {
    authStore.initialize();
  });
  
  // ฟังก์ชันสำหรับการล็อกเอาต์ (หากใช้ใน Header ให้ส่งผ่าน props หรือใช้ store)
  function logout() {
    authStore.logout();
    goto('/');
  }
</script>

{#if $page.url.pathname === '/' || $page.url.pathname === '/login'}
  <slot />
{:else if $authStore.loading}
  <div class="loading-container">
    กำลังโหลด...
  </div>
{:else if $authStore.isAuthenticated}
  <div class="layout">
    <Header />
    <div class="main-content">
      <button class="sidebar-toggle" on:click={toggleSidebar} aria-label="Toggle sidebar">
        <i class="fa-solid fa-bars"></i>
      </button>
      <Sidebar links={navLinks} on:menuClick={handleMenuClick} isOpen={isSidebarOpen} />
      <main>
        <Breadcrumb links={breadcrumbPath} />
        <slot />
      </main>
    </div>
    <Footer />
  </div>
{/if}
<style>
  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
  }

  .sidebar-toggle {
    display: none;
    position: absolute;
    top: 1rem;
    left: 1rem;
    background: #333;
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 1000;
    border-radius: 50%;
    padding: 0.5rem;
    transition: transform 0.3s ease;
  }

  .sidebar-toggle:hover {
    transform: scale(1.1);
  }

  .main-content {
    display: flex;
    flex: 1;
    background-color: #ffffff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  main {
    flex: 1;
    padding: 1.5rem;
    background-color: #f4f4f4;
    border-radius: 8px;
    margin: 1rem;
  }
  
  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 1.5rem;
    color: #333;
  }

  @media (max-width: 768px) {
    .sidebar-toggle {
      display: block;
    }

    .main-content {
      flex-direction: column;
    }

    main {
      margin: 0.5rem;
      padding: 1rem;
    }
  }

  @media (max-width: 480px) {
    .sidebar-toggle {
      top: 0.5rem;
      left: 0.5rem;
      font-size: 1.2rem;
      padding: 0.3rem;
    }

    main {
      margin: 0.3rem;
      padding: 0.8rem;
    }
  }
</style>