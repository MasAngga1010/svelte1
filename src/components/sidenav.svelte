<script>
    import LogoT from "../images/logoT.svg";
    import { onMount, onDestroy } from 'svelte';
    import Avatar from "../images/Avatars.svg"
    import { fly } from 'svelte/transition';

    // Fungsi untuk melakukan logout
    async function handleLogout() {
        try {
            const response = await fetch('http://localhost:8000/api/logout', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                }
            });

            if (!response.ok) {
                throw new Error('Logout gagal');
            }

            // Hapus token JWT dari localStorage
            localStorage.removeItem('jwtToken');

            window.location.href = 'http://localhost:5173';

        } catch (error) {
            console.error('Terjadi kesalahan saat logout:', error);
        }
    }

    // sidebar active
    let activeLink = "/";
    onMount(() => {
        activeLink = window.location.pathname;
    });

    // sidebar small widhth
    let isSidebarSmall = true; // Variabel untuk melacak keadaan sidebar
    function toggleSidebar() {
        isSidebarSmall = !isSidebarSmall; // Membalikkan keadaan sidebar
    }

    // dropdown tailwind
    let isOpen = false;
    function toggleDropdown() {
        isOpen = !isOpen;
    }

    // Fungsi untuk menutup dropdown saat mengklik di luar elemen dropdown
    function closeDropdown(event) {
        if (isOpen && !document.querySelector('.dropdown-button').contains(event.target)) {
            isOpen = false;
        }
    }
    if (!import.meta.env.SSR) { // Mengecek apakah kode berjalan di browser
        onMount(() => {
            window.addEventListener('click', closeDropdown);
        });
        onDestroy(() => {
            window.removeEventListener('click', closeDropdown);
        });
    }

    let isDropdownOpen = false;

    function toggleMyDropdown() {
        isDropdownOpen = !isDropdownOpen;
    }

</script>

<div>
    <!-- mavbar -->
    <div class=" z-10 absolute top-0 left-0 right-0">
        <div class=" w-full fixed h-20 bg-pages flex items-center justify-between ">
            <div class="flex items-center gap-4">
                <div class="ml-4 w-48 h-[40px] flex items-center border-r border-r-utama">
                    <a href="/" class=" flex items-center gap-2">
                        <img src={LogoT} alt="" />
                        <div class="flex flex-col text-putih font-bold ">
                            <h1>General</h1>
                            <h2>Ledger</h2>
                        </div>
                    </a>
                </div>
                <button class=" flex gap-6 " on:click={toggleSidebar}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6 text-putih"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                        />
                    </svg>
                </button>
            </div>
            <div class=" relative flex items-center mr-4 gap-4 ">
                <button class="gap-1 flex items-center dropdown-button" on:click={toggleDropdown}>
                    <img src={Avatar} alt="" />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        class="w-5 h-5 text-putih"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </button>
                {#if isOpen}
                <div class="origin-top-right absolute right-0 mt-40 w-48 mr-1 rounded-md"
                    in:fly={{ y: -10, duration: 300 }}
                    out:fly={{ y: -45, duration: 1000 }}
                >
                    <div class="h-5 bg-putih flex items-center rounded-md shadow-lg shadow-opacity p-8">
                        <button class="gap-2 flex items-center hover:underline underline-offset-4" on:click={handleLogout}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-hitam">
                                <path fill-rule="evenodd" d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z" clip-rule="evenodd"/>
                                <path fill-rule="evenodd" d="M19 10a.75.75 0 00-.75-.75H8.704l1.048-.943a.75.75 0 10-1.004-1.114l-2.5 2.25a.75.75 0 000 1.114l2.5 2.25a.75.75 0 101.004-1.114l-1.048-.943h9.546A.75.75 0 0019 10z" clip-rule="evenodd"/>
                            </svg>
                            <h1 class="text-hitam">Logout</h1>
                        </button>
                    </div>
                </div>  
            {/if}
            </div>
        </div>
    </div>

    <!-- sidebar -->
    <aside class="absolute top-20 left-0 bottom-0 m-0 z-10">
        <div class="{isSidebarSmall ? 'w-16 duration-300 ease-in-out' : 'w-52 duration-300 ease-in-out'} fixed font-PlusJakarta min-h-screen hover:w-52 group/side bg-putih drop-shadow-3xl shadow-sm">
            <div class="flex flex-col pt-7">
                <ul class="pl-3 flex flex-col">
                    <li class="flex flex-col"
                        in:fly={{ x: -10, duration: 1000 }}
                        out:fly={{ x: -45, duration: 300 }}
                    >
                        <a href="/dashboard" class="relative pl-2 hover:border-r py-4 rounded-l-lg cursor-pointer mb-5 hover:border-r-utama group flex items-center {activeLink === '/dashboard' ? 'border-r border-r-utama' : ''}">
                            <div class="absolute flex items-center py-2 gap-5">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-5 h-5 group-hover:text-utama text-ketiga {activeLink === '/dashboard' ? 'text-utama ' : ''}"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
                                    />
                                </svg>
                                <h1 class="group-hover:text-utama text-sm text-ketiga tracking-[0.02em] {isSidebarSmall ? 'opacity-0 group-hover/side:opacity-100 w-0 duration-300 ease-in-out pointer-events-none select-none' : 'opacity-100 duration-300 ease-in-out'} {activeLink === '/dashboard' ? 'text-utama font-bold' : 'font-medium'}">Dashboard</h1>
                            </div>
                        </a>
                    </li>
                    <li class="flex flex-col"
                        in:fly={{ x: -10, duration: 1000 }}
                        out:fly={{ x: -45, duration: 300 }}
                    >
                        <a href="/users" class="relative pl-2 hover:border-r py-4 rounded-l-lg cursor-pointer mb-5 hover:border-r-utama group flex items-center {activeLink === '/users' ? 'border-r border-r-utama' : ''}">
                            <div class="absolute flex items-center py-2 gap-5">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" viewBox="0 0 24 24" 
                                    stroke-width="1.5" 
                                    stroke="currentColor" 
                                    class="w-5 h-5 group-hover:text-utama text-ketiga {activeLink === '/users' ? 'text-utama ' : ''}"
                                >
                                    <path 
                                        stroke-linecap="round" 
                                        stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" 
                                    />
                                </svg>  
                                <h1 class="group-hover:text-utama gap-1 flex text-sm text-ketiga tracking-[0.02em] {isSidebarSmall ? 'opacity-0 group-hover/side:opacity-100 w-0 duration-300 ease-in-out pointer-events-none select-none' : 'opacity-100 duration-300 ease-in-out'} {activeLink === '/users' ? 'text-utama font-bold' : 'font-medium'}">Ledger<span>User</span> </h1>
                            </div>
                        </a>
                    </li>
                    <li class="flex flex-col"
                        in:fly={{ x: -10, duration: 1000 }}
                        out:fly={{ x: -45, duration: 300 }}
                    >
                        <a href="/COA" class="relative pl-2 hover:border-r py-4 rounded-l-lg cursor-pointer mb-5 hover:border-r-utama group flex items-center {activeLink === '/COA' ? 'border-r border-r-utama' : ''}">
                            <div class="absolute flex items-center py-2 gap-5">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" viewBox="0 0 24 24" 
                                    stroke-width="1.5" 
                                    stroke="currentColor"
                                    class="w-5 h-5 group-hover:text-utama text-ketiga {activeLink === '/COA' ? 'text-utama ' : ''}"
                                >
                                    <path 
                                        stroke-linecap="round" 
                                        stroke-linejoin="round" 
                                        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" 
                                    />
                                </svg>
                                <h1 class="group-hover:text-utama gap-1 flex text-sm text-ketiga tracking-[0.02em] {isSidebarSmall ? 'opacity-0 group-hover/side:opacity-100 w-0 duration-300 ease-in-out pointer-events-none select-none' : 'opacity-100 duration-300 ease-in-out'} {activeLink === '/COA' ? 'text-utama font-bold' : 'font-medium'}">Chart<span>Of</span><span>Account</span></h1>
                            </div>
                        </a>
                    </li>
                    <li class="flex flex-col"
                        in:fly={{ x: -10, duration: 1000 }}
                        out:fly={{ x: -45, duration: 300 }}
                    >
                        <a href="/Jnumber" class="relative pl-2 hover:border-r py-4 rounded-l-lg cursor-pointer mb-5 hover:border-r-utama group flex items-center {activeLink === '/Jnumber' ? 'border-r border-r-utama' : ''}">
                            <div class="absolute flex items-center py-2 gap-5">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke-width="1.5" 
                                    stroke="currentColor" 
                                    class="w-5 h-5 group-hover:text-utama text-ketiga {activeLink === '/Jnumber' ? 'text-utama ' : ''}"
                                >
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                </svg>
                                <h1 class="group-hover:text-utama gap-1 flex text-sm text-ketiga tracking-[0.02em] {isSidebarSmall ? 'opacity-0 group-hover/side:opacity-100 w-0 duration-300 ease-in-out pointer-events-none select-none' : 'opacity-100 duration-300 ease-in-out'} {activeLink === '/Jnumber' ? 'text-utama font-bold' : 'font-medium'}">Jurnal<span>Number</span> </h1>
                            </div>
                        </a>
                    </li>
                    <li class="flex flex-col"
                        in:fly={{ x: -10, duration: 1000 }}
                        out:fly={{ x: -45, duration: 300 }}
                    >
                        <a href="/BukuBesar" class="relative pl-2 hover:border-r py-4 rounded-l-lg cursor-pointer mb-5 hover:border-r-utama group flex items-center {activeLink === '/BukuBesar' ? 'border-r border-r-utama' : ''}">
                            <div class="absolute flex items-center py-2 gap-5">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke-width="1.5" 
                                    stroke="currentColor" 
                                    class="w-5 h-5 group-hover:text-utama text-ketiga {activeLink === '/BukuBesar' ? 'text-utama ' : ''}"
                                >
                                    <path 
                                        stroke-linecap="round" 
                                        stroke-linejoin="round" 
                                        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" 
                                    />
                                </svg>
                                <h1 class="group-hover:text-utama gap-1 flex text-sm text-ketiga tracking-[0.02em] {isSidebarSmall ? 'opacity-0 group-hover/side:opacity-100 w-0 duration-300 ease-in-out pointer-events-none select-none' : 'opacity-100 duration-300 ease-in-out'} {activeLink === '/BukuBesar' ? 'text-utama font-bold' : 'font-medium'}">Buku<span>Besar</span> </h1>
                            </div>
                        </a>
                    </li>
                    <!-- <li class="flex flex-col"
                        in:fly={{ x: -10, duration: 1000 }}
                        out:fly={{ x: -45, duration: 300 }}
                    >
                        <button on:click={toggleMyDropdown} class="relative pl-2 hover:border-r py-4 rounded-l-lg cursor-pointer mb-5 hover:border-r-utama group flex items-center {activeLink === '/Jpembelian' || activeLink === '/Jpenjualan' || activeLink === '/Jpenggajian' || activeLink === '/Jpenerima' || activeLink === '/Jpengeluaran' ? 'border-r border-r-utama' : ''}" >
                            <div class="absolute flex items-center py-2 gap-5">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" viewBox="0 0 24 24" 
                                    stroke-width="1.5" 
                                    stroke="currentColor" 
                                    class="w-5 h-5 group-hover:text-utama text-ketiga {activeLink === '/Jpembelian' || activeLink === '/Jpenjualan' || activeLink === '/Jpenggajian' || activeLink === '/Jpenerima' || activeLink === '/Jpengeluaran' ?  'text-utama ' : ''}"
                                >
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25" />
                                </svg>
                            <h1 class="group-hover:text-utama gap-1 flex text-sm text-ketiga tracking-[0.02em] {isSidebarSmall ? 'opacity-0 group-hover/side:opacity-100 w-0 duration-300 ease-in-out pointer-events-none select-none' : 'opacity-100 duration-300 ease-in-out'} {activeLink === '/Jpembelian' || activeLink === '/Jpenjualan' || activeLink === '/Jpenggajian' || activeLink === '/Jpenerima' || activeLink === '/Jpengeluaran' ? 'text-utama font-bold' : 'font-medium'}">List<span>Jurnal</span> </h1>
                            </div>
                        </button>
                        {#if isDropdownOpen }
                        <ul class="  flex flex-col gap-5 mb-5 w-full pl-12" 
                            in:fly={{ y: -10, duration: 1000 }}
                            out:fly={{ y: -20, duration: 300 }}
                        >
                            <li class=" hover:border-r hover:border-r-utama group">
                                <a class=" text-sm gap-2 flex group-hover:text-utama text-ketiga {isSidebarSmall ? 'opacity-0 group-hover/side:opacity-100 w-0 duration-300 ease-in-out' : 'opacity-100 duration-300 ease-in-out'} {activeLink === '/Jpembelian' ? 'text-utama' : 'font-medium'}" href="/Jpembelian">Jurnal <span>Pembelian</span></a>
                            </li>
                            <li class=" hover:border-r hover:border-r-utama group">
                                <a class=" text-sm gap-2 flex group-hover:text-utama text-ketiga {isSidebarSmall ? 'opacity-0 group-hover/side:opacity-100 w-0 duration-300 ease-in-out' : 'opacity-100 duration-300 ease-in-out'} {activeLink === '/Jpenjualan' ? 'text-utama' : 'font-medium'}" href="/Jpenjualan">Jurnal <span>Penjualan</span></a>
                            </li>
                            <li class=" hover:border-r hover:border-r-utama group">
                                <a class=" text-sm gap-2 flex group-hover:text-utama text-ketiga {isSidebarSmall ? 'opacity-0 group-hover/side:opacity-100 w-0 duration-300 ease-in-out' : 'opacity-100 duration-300 ease-in-out'} {activeLink === '/Jpenggajian' ? 'text-utama' : 'font-medium'}" href="/Jpenggajian">Jurnal <span>Penggajian</span></a>
                            </li>
                            <li class=" hover:border-r hover:border-r-utama group">
                                <a class=" text-sm gap-2 flex group-hover:text-utama text-ketiga {isSidebarSmall ? 'opacity-0 group-hover/side:opacity-100 w-0 duration-300 ease-in-out' : 'opacity-100 duration-300 ease-in-out'} {activeLink === '/Jpenerima' ? 'text-utama' : 'font-medium'}" href="/Jpenerima">Jurnal <span>Penerimaan</span></a>
                            </li>
                            <li class=" hover:border-r hover:border-r-utama group"
                            >
                                <a class=" text-sm gap-2 flex group-hover:text-utama text-ketiga {isSidebarSmall ? 'opacity-0 group-hover/side:opacity-100 w-0 duration-300 ease-in-out' : 'opacity-100 duration-300 ease-in-out'} {activeLink === '/Jpengeluaran' ? 'text-utama' : 'font-medium'}" href="/Jpengeluaran">Jurnal <span>Pengeluaran</span></a>
                            </li>
                        </ul>
                        {/if}
                    </li> -->
                </ul>
            </div>
        </div>
    </aside>
    
</div>