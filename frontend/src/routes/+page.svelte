<script>
  import { onMount } from "svelte";
  import SocialLogin from "$lib/SocialLogin.svelte";
  import { goto } from "$app/navigation";
  import { browser } from "$app/environment";
  import { authStore } from '$lib/stores/authStore';

  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const FACEBOOK_APP_ID = import.meta.env.VITE_FACEBOOK_APP_ID;
  const BACKEND_API = import.meta.env.VITE_BACKEND_API; 

  let loading = false;
  let error = null;

  async function handleGoogleSuccess(event) {
    const { user, credential } = event.detail;
    loading = true;
    error = null;

    try {
      const response = await fetch(`${BACKEND_API}/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          credential,
          userData: {
            name: user.name,
            email: user.email,
            picture: user.picture,
            googleId: user.sub,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to authenticate with server");
      }

      const data = await response.json();

      authStore.login(data.token, data.user);

      goto("/home");
    } catch (err) {
      console.error("Google authentication error:", err);
      error = "Failed to complete authentication. Please try again.";
    } finally {
      loading = false;
    }
  }


  async function handleFacebookSuccess(event) {
    const { accessToken, user, userID } = event.detail;
    loading = true;
    error = null;

    try {
      if (!userID) {
        throw new Error("Missing Facebook ID");
      }

      const response = await fetch(`${BACKEND_API}/auth/facebook`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessToken,
          userData: {
            facebookId: userID,
            name: user.name,
            email: user.email,
            picture: user.picture?.data?.url,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        throw new Error("Failed to authenticate with server");
      }

      const data = await response.json();
      
      authStore.login(data.token, data.user);
      
      goto("/home");
    } catch (err) {
      console.error("Facebook authentication error:", err);
      error = "Failed to complete authentication. Please try again.";
    } finally {
      loading = false;
    }
  }

  function handleGoogleFailure(event) {
    const { error: authError } = event.detail;
    console.error("Google authentication failed:", authError);
    error = "Failed to authenticate with Google. Please try again.";
    loading = false;
  }

  function handleFacebookFailure(event) {
    const { error: authError } = event.detail;
    console.error("Facebook authentication failed:", authError);
    error = "Failed to authenticate with Facebook. Please try again.";
    loading = false;
  }
  
  onMount(() => {
    if (browser && localStorage.getItem("sessionToken")) {
      goto("/home");
    }
  });
</script>

<div class="container">
  <div class="welcome-card">
    <div class="header-section">
      <h1>ยินดีต้อนรับ</h1>
      <div class="divider"></div>
      <h2>ระบบงานเอกสารสัญญาทางกฎหมาย</h2>
      <p class="subtitle">สาขาวิชานิติศาสตร์ มหาวิทยาลัยราชภัฏบุรีรัมย์</p>
    </div>

    <div class="signin-container">
      {#if error}
        <div class="error-message">
          <i class="fas fa-exclamation-circle"></i>
          {error}
        </div>
      {/if}

      {#if loading}
        <div class="loading">
          <div class="spinner"></div>
          <span>กำลังเข้าสู่ระบบ...</span>
        </div>
      {:else}
        <div class="login-prompt">
          <p>กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ</p>
          <SocialLogin
            googleClientId={GOOGLE_CLIENT_ID}
            facebookAppId={FACEBOOK_APP_ID}
            on:google-auth-success={handleGoogleSuccess}
            on:google-auth-failure={handleGoogleFailure}
            on:facebook-auth-success={handleFacebookSuccess}
            on:facebook-auth-failure={handleFacebookFailure}
          />
        </div>
      {/if}
    </div>

    <div class="footer-info">
      <p>© {new Date().getFullYear()} สาขาวิชานิติศาสตร์ มหาวิทยาลัยราชภัฏบุรีรัมย์</p>
    </div>
  </div>
</div>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ed 100%);
    padding: 1rem;
  }

  .welcome-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
    width: 100%;
    max-width: 600px;
    padding: 2.5rem;
    text-align: center;
    overflow: hidden;
  }

  .header-section {
    margin-bottom: 2rem;
  }

  h1 {
    color: #333;
    font-size: 2.2rem;
    font-weight: 600;
    margin: 0 0 0.75rem 0;
  }

  h2 {
    color: #444;
    font-size: 1.5rem;
    font-weight: 500;
    margin: 1rem 0 0.5rem 0;
  }

  .subtitle {
    color: #666;
    font-size: 1.1rem;
    margin: 0.5rem 0 1rem 0;
  }

  .divider {
    height: 3px;
    width: 60px;
    background: #3498db;
    margin: 1rem auto;
    border-radius: 2px;
  }

  .signin-container {
    padding: 1.5rem 0;
  }

  .login-prompt {
    margin-bottom: 1.5rem;
  }

  .login-prompt p {
    color: #555;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
  }

  .error-message {
    background-color: #ffe3e3;
    color: #e74c3c;
    padding: 0.75rem 1rem;
    border-radius: 6px;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    font-size: 0.95rem;
  }

  .error-message i {
    margin-right: 0.5rem;
    font-size: 1.1rem;
  }

  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem;
  }

  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top: 4px solid #3498db;
    width: 30px;
    height: 30px;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .footer-info {
    margin-top: 2rem;
    font-size: 0.85rem;
    color: #888;
    border-top: 1px solid #eee;
    padding-top: 1.5rem;
  }

  /* Responsive adjustments */
  @media (max-width: 576px) {
    .welcome-card {
      padding: 1.5rem;
    }

    h1 {
      font-size: 1.8rem;
    }

    h2 {
      font-size: 1.3rem;
    }

    .subtitle {
      font-size: 1rem;
    }
  }
</style>