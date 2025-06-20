<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <NuxtRouteAnnouncer />
    
    <!-- Header -->
    <header class="bg-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <NuxtLink to="/" class="text-3xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
            Legend in the Mist
          </NuxtLink>          <nav class="hidden md:flex space-x-8">
            <NuxtLink to="/" class="text-gray-500 hover:text-gray-900 transition-colors">首頁</NuxtLink>
            <NuxtLink to="/character-reference" class="text-gray-500 hover:text-gray-900 transition-colors">角色參考</NuxtLink>
            <a href="#" class="text-gray-500 hover:text-gray-900 transition-colors">關於</a>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="min-h-screen">
      <NuxtPage />
    </main>
  </div>
</template>
