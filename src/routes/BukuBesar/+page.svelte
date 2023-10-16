<script>
    import { onMount } from 'svelte';
    import Sidenav from "../../components/sidenav.svelte";
    import { fly } from 'svelte/transition';

    let jurnalumum = [];

    async function fetchData() {
        try {
            const response = await fetch('http://localhost:8000/umum');
            if (response.ok) {
                jurnalumum = await response.json();
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
                <h1 class="font-bold text-utama text-xl">Buku Besar</h1>
            </div>
            <!-- end opening -->
            <div class="flex items-start gap-8 mb-8 mt-4">
                <!-- Tabel Pengguna -->
                    <div class="w-full drop-shadow-3xl shadow-sm rounded-sm bg-putih">
                    <div class="flex items-center p-4">
                        <h1 class="font-bold text-hitam text-lg ">Akun Debit</h1>
                    </div>
                    <div class=" overflow-hidden rounded-b-md">
                        <div class="w-full h-[calc(100vh - 300px)] overflow-y-scroll overflow-x-scroll">
                            <table class="w-full">
                                <thead class=" relative w-full">
                                    <tr class="text-left text-hitam border-y bg-second border-y-kelima">
                                        <th class="px-4 py-3 text-xs">Tanggal Pembelian</th>
                                        <th class="px-4 py-3 text-xs">Jurnal</th>
                                        <th class="px-4 py-3 text-xs">Nama Akun</th>
                                        <th class="px-4 py-3 text-xs">Debit</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white">
                                    {#each jurnalumum as jurnal}
                                        <tr class="text-gray-700 border-b hover:bg-second border-b-kelima">
                                            <td class="px-4 py-3 text-xs">{jurnal.tgl_pembelian}</td>
                                            <td class="px-4 py-3 text-xs">{jurnal.jurnal}</td>
                                            <td class="px-4 py-3 text-xs">{jurnal.akun_debit}</td>
                                            <td class="px-4 py-3 text-xs">{jurnal.total_debit}</td>
                                        </tr>
                                    {/each}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="w-full drop-shadow-3xl shadow-sm rounded-sm bg-putih">
                    <div class="flex items-center p-4">
                        <h1 class="font-bold text-hitam text-lg ">Akun Kredit</h1>
                    </div>
                    <div class=" overflow-hidden rounded-b-md">
                        <div class="w-full h-[calc(100vh - 300px)] overflow-y-scroll overflow-x-scroll">
                            <table class="w-full">
                                <thead class=" relative w-full">
                                    <tr class="text-left text-hitam border-y bg-second border-y-kelima">
                                        <th class="px-4 py-3 text-xs">Tanggal Pembelian</th>
                                        <th class="px-4 py-3 text-xs">Jurnal</th>
                                        <th class="px-4 py-3 text-xs">Nama Akun</th>
                                        <th class="px-4 py-3 text-xs">Kredit</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white">
                                    {#each jurnalumum as jurnal}
                                        <tr class="text-gray-700 border-b hover:bg-second border-b-kelima">
                                            <td class="px-4 py-3 text-xs">{jurnal.tgl_pembelian}</td>
                                            <td class="px-4 py-3 text-xs">{jurnal.jurnal}</td>
                                            <td class="px-4 py-3 text-xs">{jurnal.akun_debit}</td>
                                            <td class="px-4 py-3 text-xs">{jurnal.total_debit}</td>
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
