<script>
    import { onMount } from 'svelte';
    import Sidenav from "../../components/sidenav.svelte";
    import { fly } from 'svelte/transition';

    let users = [];

    async function fetchData() {
        try {
            const response = await fetch('http://localhost:8000/users');
            if (response.ok) {
                users = await response.json();
            } else {
                console.error('Gagal mendapatkan data dari server');
            }
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
        }
    }

    onMount(() => {
        fetchData();
    });
</script>

<div>
    <Sidenav />
    <main class="ml-16 mt-20"
        in:fly={{ y: 100, duration: 2000 }}
        out:fly={{ y: -50, duration: 300 }}
    >
        <div class="flex flex-col gap-4 px-5 pt-[30px]">
            <!-- opening -->
            <div>
                <h1 class="font-bold text-utama text-xl">Ledger User</h1>
            </div>
            <!-- end opening -->
            <div class="flex flex-col gap-8 mb-8 mt-4">
                <!-- Tabel Pengguna -->
                <div class="w-full drop-shadow-3xl shadow-sm rounded-sm bg-putih">
                    <div class="flex items-center p-4">
                        <h1 class="font-bold text-hitam text-lg">User</h1>
                    </div>
                    <div class="w-full overflow-hidden rounded-b-md">
                        <div class="w-full overflow-x-scroll">
                            <table class="w-full">
                                <thead>
                                    <tr class="text-left text-hitam border-y bg-second border-y-kelima">
                                        <th class="px-4 py-3 text-xs">ID User</th>
                                        <th class="px-4 py-3 text-xs">Username</th>
                                        <th class="px-4 py-3 text-xs">Password</th>
                                        <th class="px-4 py-3 text-xs">Level</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white">
                                    {#each users as user (user.id)}
                                        <tr class="text-gray-700 border-b hover:bg-second border-b-kelima">
                                            <td class="px-4 py-3 text-xs">{user.id}</td>
                                            <td class="px-4 py-3 text-xs">{user.username}</td>
                                            <td class="px-4 py-3 text-xs">{user.pass}</td>
                                            <td class="px-4 py-3 text-xs">{user.level}</td>
                                        </tr>
                                    {/each}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>
