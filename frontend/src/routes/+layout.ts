import { authStore } from '$lib/stores/authStore';
import { goto } from '$app/navigation';
import { get } from 'svelte/store';
import { browser } from '$app/environment';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url }) => {
  if (browser) {
    authStore.initialize();
  }
  
  const publicPaths = ['/', '/login'];
  const isPublicPath = publicPaths.some(path => url.pathname === path || url.pathname.startsWith('/auth'));
  
  if (!isPublicPath && browser) {
    const auth = get(authStore);
    
    if (!auth.loading && !auth.isAuthenticated) {
      goto('/');
    }
  }
  
  return {
    authenticated: browser ? get(authStore).isAuthenticated : false
  };
};