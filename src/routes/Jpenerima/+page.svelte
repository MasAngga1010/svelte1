<script>
    import { onMount, onDestroy } from 'svelte';
    import Sidenav from '../../components/sidenav.svelte';
    import { fly } from 'svelte/transition';

    // Data pembelian
    let pembelianData = [];

    // State variabel untuk form tambah pembelian
    let isOpen1 = false;
    let tgl_penerimaan = '';
    let no_akun = '';
    let nama_akun = '';
    let saldo = '';
    let jenis = '';

    // Alert sukses dan gagal
    let successMessage = '';
    let errorMessage = '';
    let alertTimeout;

    // Fungsi untuk mengambil data pembelian dari server
    async function fetchData() {
        try {
            const response = await fetch('http://localhost:8000/penerima');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            pembelianData = await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Fungsi untuk membuka atau menutup modal tambah pembelian
    function toggleDropdown1() {
        isOpen1 = !isOpen1;
    }

    // Fungsi untuk menutup modal saat mengklik di luar elemen modal
    function closeDropdown(event) {
        const modal = document.querySelector('.modal');
        const modalContent = document.querySelector('.modal-content');
        if (isOpen1 && event.target === modal) {
            isOpen1 = false;
        }
    }

    // Event listener untuk menutup modal saat mengklik di luar elemen modal
    if (!import.meta.env.SSR) {
        onMount(() => {
            window.addEventListener('click', closeDropdown);
        });

        onDestroy(() => {
            window.removeEventListener('click', closeDropdown);
        });
    }

    // Fungsi untuk menambahkan pembelian baru
    async function tambahPembelian() {
        const data = {
            tgl_penerimaan,
            no_akun,
            nama_akun,
            saldo,
            jenis,
        };

    try {
        const response = await fetch('http://localhost:8000/penerima', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            // Data berhasil ditambahkan
            console.log('Data berhasil ditambahkan');
            showAlert('success'); // Menampilkan pesan sukses
            // Reset form
            tgl_penerimaan = '';
            no_akun = '';
            nama_akun = '';
            saldo = '';
            jenis = '';
            // Tutup modal
            isOpen1 = false;
            // Refresh data pembelian
            refreshPembelianData();
        } else {
            // Handle kesalahan jika ada
            console.error('Gagal menambahkan data');
            showAlert('error'); // Menampilkan pesan error
        }
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
        }
    }

    // Fungsi untuk menampilkan pesan alert
    function showAlert(message) {
        if (alertTimeout) {
            clearTimeout(alertTimeout); // Hapus timeout yang ada jika ada
        }
        message === 'success' ? (successMessage = 'Data berhasil ditambahkan') : (errorMessage = 'Gagal menambahkan data');

        alertTimeout = setTimeout(() => {
            clearAlert();
        }, 2000); // Menghapus pesan alert setelah 2 detik
    }

    // Fungsi untuk menghapus pesan alert
    function clearAlert() {
        successMessage = '';
        errorMessage = '';
    }

    // Fungsi untuk menyegarkan data pembelian setelah penambahan
    async function refreshPembelianData() {
        await fetchData();
    }

    // Panggil fungsi untuk mengambil data pembelian saat komponen dimuat
    onMount(fetchData);
</script>

<div>
    <Sidenav />
    <main class="ml-16 mt-20"
        in:fly={{ y: 100, duration: 2000 }}
        out:fly={{ y: -50, duration: 300 }}
    >
        <!-- Menampilkan pesan berhasil -->
        <div class=" fixed top-4 z-[999999] right-4"
            
        >
            {#if successMessage}
                <div class="bg-green-200 bg-hijau text-putih py-2 px-4 font-bold rounded-md mt-2"
                    in:fly={{ x: 100, duration: 1000 }} 
                    out:fly={{ x: 100., duration: 1000 }}
                >
                    <h1>{successMessage}</h1>
                </div>
            {/if}
            <!-- Menampilkan pesan gagal -->
            {#if errorMessage}
                <div class="bg-green-200 bg-merah text-putih py-2 px-4 font-bold rounded-md mt-2"
                    in:fly={{ x: 100, duration: 1000 }} 
                    out:fly={{ x: 100., duration: 1000 }}
                >
                    <h1>{errorMessage}</h1>
                </div>
            {/if}
        </div>
        <!-- modal tambah -->
        {#if isOpen1}
        <div class="modal flex justify-center items-center w-full h-full z-[99999] backdrop-blur-sm overflow-x-hidden overflow-y-auto fixed inset-0" 
            in:fly={{ duration: 300 }} 
            out:fly={{ duration: 300 }}
        >
            <div class="h-min modal-content w-[600px] bg-putih shadow flex items-center rounded-md" 
                in:fly={{ y: -100, duration: 1000 }} 
                out:fly={{ y: -100., duration: 300 }}
            >
                <div class="flex w-full flex-col">
                    <div class="flex flex-col">
                        <h1 class="px-8 text-center pt-8 font-bold">Tambah Penerima</h1>
                    </div>
                    <div class="flex flex-col gap-4 w-full p-8">
                        <div class="flex flex-col gap-2">
                            <label for="tanggal" class="text-hitam text-xs">Tanggal Penerima</label>
                            <input type="text" id="tanggal" placeholder="Tanggal Penerima" class="w-full border py-3 px-4 rounded-md border-kelima placeholder:text-xs text-xs focus:outline-none" bind:value={tgl_penerimaan}>
                        </div>
                        <div class="w-full flex gap-4 items-start">
                            <div class="w-1/2 flex flex-col gap-2">
                                <label for="no-akun" class="text-hitam text-xs">No Akun</label>
                                <input type="number" id="no-akun" placeholder="No Akun" class="w-full border py-3 px-4 rounded-md border-kelima placeholder:text-xs text-xs focus:outline-none" bind:value={no_akun}>
                            </div>
                        <div class="w-1/2 flex flex-col gap-2">
                            <label for="nama-akun" class="text-hitam text-xs">Nama Akun</label>
                            <input type="text" id="nama-akun" placeholder="Nama Akun" class="w-full border py-3 px-4 rounded-md border-kelima placeholder:text-xs text-xs focus:outline-none" bind:value={nama_akun}>
                        </div>
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="salod" class="text-hitam text-xs">Saldo</label>
                            <input type="text" id="salod" placeholder="Saldo" class="w-full border py-3 px-4 rounded-md border-kelima placeholder:text-xs text-xs focus:outline-none" bind:value={saldo}>
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="jenis" class="text-hitam text-xs">Jenis</label>
                            <select id="jenis" name="jenis" class="w-full border py-3 px-4 rounded-md border-kelima text-xs focus:outline-none" bind:value={jenis}>
                                <option value="Debit">Debit</option>
                                <option value="Kredit">Kredit</option>
                            </select>
                        </div>
                        <button class="hover:bg-[#e0ebe0] duration-300 ease-in-out w-full bg-hijau rounded-md py-2 text-putih" on:click={tambahPembelian}>Tambah Penerima</button>
                    </div>
                </div>
            </div>
        </div>
        {/if}
        <!-- end modal tambah -->
        <div class="flex flex-col gap-4 px-5 pt-[30px]">
            <!-- opening -->
            <div>
                <h1 class="font-bold text-utama text-xl">Jurnal Penerima</h1>
            </div>
            <!-- end opening -->
            <div class="flex items-start gap-8 mb-8 mt-4">
                <!-- Tabel Pembelian -->
                <div class="w-full drop-shadow-3xl shadow-sm rounded-sm bg-putih">
                    <div class="flex justify-between items-center p-4">
                        <h1 class="font-bold text-hitam text-lg">Penerima</h1>
                        <button class=" bg-hijau hover:bg-[#e0ebe0] duration-300 ease-in-out flex items-center rounded-full px-4 py-2 gap-2 dropdown-button1" on:click={toggleDropdown1}>
                            <h1 class="font-bold text-putih text-sm  ">Tambah</h1>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-putih">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                    </div>
                    <div class="w-full overflow-hidden rounded-b-md">
                        <div class="w-full h-[calc(100vh - 300px)]  overflow-y-scroll h-[300px] overflow-x-scroll">
                            <table class="w-full">
                                <thead>
                                    <tr class="text-left text-hitam border-y bg-second border-y-kelima">
                                        <th class="px-4 py-3 text-xs">Tanggal</th>
                                        <th class="px-4 py-3 text-xs">No Akun</th>
                                        <th class="px-4 py-3 text-xs">Nama Akun</th>
                                        <th class="px-4 py-3 text-xs">Saldo</th>
                                        <th class="px-4 py-3 text-xs">Jenis</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white">
                                    {#each pembelianData as pembelian}
                                    <tr class="text-gray-700 border-b hover:bg-second border-b-kelima">
                                        <td class="px-4 py-3 text-xs">{pembelian.tgl_penerimaan}</td>
                                        <td class="px-4 py-3 text-xs">{pembelian.no_akun}</td>
                                        <td class="px-4 py-3 text-xs">{pembelian.nama_akun}</td>
                                        <td class="px-4 py-3 text-xs">{pembelian.saldo}</td>
                                        <td class="px-4 py-3 text-xs">{pembelian.jenis}</td>
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


