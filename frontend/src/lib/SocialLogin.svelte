<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';

  export let googleClientId: string;
  export let facebookAppId: string;
  export let googleText: string = 'Sign in with Google';
  export let facebookText: string = 'Sign in with Facebook';
  
  const dispatch = createEventDispatcher();
  

  let googleButtonContainer: HTMLElement;
  let disabled = true;
  onMount(() => {
    const googleScript = document.createElement('script');
    googleScript.src = 'https://accounts.google.com/gsi/client';
    googleScript.async = true;
    googleScript.defer = true;
    googleScript.onload = () => {
      if ((window as any).google) initializeGoogleSignIn();
    };
    document.head.appendChild(googleScript);

    const fbScript = document.createElement('script');
    fbScript.src = 'https://connect.facebook.net/en_US/sdk.js';
    fbScript.async = true;
    fbScript.defer = true;
    fbScript.onload = () => {
       if ((window as any).FB) initializeFacebookSDK();
    };
    document.head.appendChild(fbScript);

    return () => {
      if (document.head.contains(googleScript)) document.head.removeChild(googleScript);
      if (document.head.contains(fbScript)) document.head.removeChild(fbScript);
    };
  });

  function initializeGoogleSignIn() {
    (window as any).google.accounts.id.initialize({
      client_id: googleClientId,
      callback: handleGoogleCredential
    });

    (window as any).google.accounts.id.renderButton(
      googleButtonContainer, 
      { 
        type: 'standard',
        theme: 'outline',
        size: 'large',
        text: googleText
      }
    );

    disabled = false;
  }

  function initializeFacebookSDK() {
    (window as any).FB.init({
      appId: facebookAppId,
      cookie: true,
      xfbml: true,
      version: 'v18.0'
    });
    disabled = false;
  }

  function handleGoogleCredential(response: any) {
    if (response.credential) {
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const user = JSON.parse(jsonPayload);
      
      dispatch('google-auth-success', { 
        user,
        credential: response.credential 
      });
    } else {
      dispatch('google-auth-failure', { 
        error: 'No credential received' 
      });
    }
  }

  function handleFacebookLogin() {
    if (!(window as any).FB) {
      console.error("Facebook SDK not loaded yet.");
      return;
    }

    (window as any).FB.login(function(response: any) {
      if (response.status === 'connected') {
        (window as any).FB.api('/me', { fields: 'id,name,email,picture' }, function(userData: any) {
          dispatch('facebook-auth-success', {
            user: userData,
            accessToken: response.authResponse.accessToken,
            userID: response.authResponse.userID
          });
        });
      } else {
        dispatch('facebook-auth-failure', {
          error: 'Facebook login failed'
        });
      }
    }, { scope: 'public_profile,email' });
  }
</script>

<div class="social-login">
  <div bind:this={googleButtonContainer} class:disabled></div>
  
  <button 
    class="facebook-button" 
    on:click={handleFacebookLogin}
    {disabled}
  >
    <svg class="fb-icon" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
    {facebookText}
  </button>
</div>

<style>
  .social-login {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }

  .disabled {
    pointer-events: none;
    opacity: 0.6;
  }

  .facebook-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background-color: #1877f2;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    font-family: Roboto, sans-serif;
    font-size: 14px;
    cursor: pointer;
    width: 100%;
    max-width: 220px;
    height: 40px;
  }

  .facebook-button:hover {
    background-color: #166fe5;
  }
  
  .facebook-button:disabled {
    background-color: #a0a0a0;
    cursor: not-allowed;
  }

  .fb-icon {
    width: 20px;
    height: 20px;
    fill: currentColor;
  }
</style>