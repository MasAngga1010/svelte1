<script>
    // Import yang diperlukan
    import { onMount, onDestroy } from 'svelte';
    import { fly } from 'svelte/transition';
    import Sidenav from "../../components/sidenav.svelte";

    // Modal state
    let isOpen1 = false;

    // State untuk alert sukses dan gagal
    let successMessage = '';
    let errorMessage = '';
    let alertTimeout;

    // Fungsi untuk menampilkan alert sukses
    function showSuccessMessage(message) {
        successMessage = message;
        clearTimeout(alertTimeout);
        alertTimeout = setTimeout(() => {
            successMessage = '';
        }, 1500); // Setelah 1.5 detik, alert sukses akan hilang
    }

    // Fungsi untuk menampilkan alert gagal
    function showErrorMessage(message) {
        errorMessage = message;
        clearTimeout(alertTimeout);
        alertTimeout = setTimeout(() => {
            errorMessage = '';
        }, 1500); // Setelah 1.5 detik, alert gagal akan hilang
    }

    // Fungsi untuk membuka atau menutup modal tambah pembelian
    function toggleDropdown1() {
        isOpen1 = !isOpen1;
    }

    // Fungsi untuk menutup modal saat mengklik di luar elemen modal
    function closeDropdown(event) {
        const modal = document.querySelector('.modal');
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

    // State untuk data API
    let apiData = [];

    // Fungsi untuk mengambil data dari API laravel lumen
    async function fetchData() {
        try {
            const response = await fetch('http://localhost:8000/api/jurnal');
            if (response.ok) {
                const responseData = await response.json();
                if (responseData.status_code === 200) {
                    // Simpan data dari respon API
                    apiData = responseData.data;
                } else {
                    console.error('Respon API menunjukkan kegagalan:', responseData.message);
                }
            } else {
                console.error('Gagal mengambil data dari API');
            }
        } catch (error) {
            console.error('Kesalahan saat mengambil data:', error);
        }
    }

    // Panggil fetchData saat komponen terpasang
    if (!import.meta.env.SSR) {
        onMount(fetchData);
    }

    // State untuk field dinamis debit
    let debitFields = [{ id: 1, comp_id: '', account_code: '', financial_type: 'debit', amount: '', transaction_date: '' }];
    let nextDebitId = 2;

    // Fungsi untuk menambahkan field debit baru
    function addDebitField() {
        const newField = { id: nextDebitId, comp_id: '', account_code: '', financial_type: 'debit', amount: '', transaction_date: '' };
        debitFields = [...debitFields, newField];
        nextDebitId += 1;
    } 

    // State untuk field dinamis kredit
    let creditFields = [{ id: 1, comp_id: '', account_code: '', financial_type: 'kredit', amount: '', transaction_date: '' }];
    let nextCreditId = 2;

    // Fungsi untuk menambahkan field kredit baru
    function addCreditField() {
        const newField = { id: nextCreditId, comp_id: '', account_code: '', financial_type: 'kredit', amount: '', transaction_date: '' };
        creditFields = [...creditFields, newField];
        nextCreditId += 1;
    }

    // Fungsi untuk menggabungkan semua field debit dan kredit
    function combineFields() {
        return [...debitFields, ...creditFields];
    }

    async function handleSubmit() {
        const allFields = combineFields();

        // Validasi formulir sebelum mengirim data
        const debitFormIsValid = debitFields.every(field => field.comp_id && field.account_code && field.financial_type && field.amount && field.transaction_date);
        const creditFormIsValid = creditFields.every(field => field.comp_id && field.account_code && field.financial_type && field.amount && field.transaction_date);

        if (!debitFormIsValid || !creditFormIsValid) {
            showErrorMessage('Harap isi semua kolom dalam formulir debit dan kredit.');
            return; // Jangan kirim permintaan jika validasi gagal
        }

        // Hitung jumlah total debit dan kredit
        const totalDebit = debitFields.reduce((total, field) => total + parseFloat(field.amount), 0);
        const totalCredit = creditFields.reduce((total, field) => total + parseFloat(field.amount), 0);

        // Validasi apakah jumlah debit dan kredit sama
        if (totalDebit !== totalCredit) {
            showErrorMessage('Jumlah total debit harus sama dengan jumlah total kredit.');
            return; // Jangan kirim permintaan jika validasi gagal
        }

        // Lakukan pengiriman data seperti yang Anda lakukan sebelumnya
        for (const field of allFields) {
            try {
            const response = await fetch('http://localhost:8000/api/jurnal/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(field),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.status_code === 201) {
                    // Tangani respon sukses
                    showSuccessMessage(data.message);
                    debitFields = [{ id: 1, comp_id: '', account_code: '', financial_type: '', amount: '', transaction_date: '' }];
                    creditFields = [{ id: 1, comp_id: '', account_code: '', financial_type: '', amount: '', transaction_date: '' }];
                    fetchData(); // data realtime
                    // Tutup modal (contoh: jika menggunakan isOpen1)
                    isOpen1 = false;
                    // Membersihkan konsol
                    console.clear();
                } else {
                    // Tangani respon gagal
                    showErrorMessage(data.message);
                }
            } else {
                const data = await response.json();
                if (data.status_code === 422) {
                    // Tangani respon dengan pesan kesalahan dari server
                    showErrorMessage(data.message);
                    console.error('Pesan Kesalahan:', data.message);
                } else {
                    console.error('Gagal mengirim permintaan.');
                }
            }
            } catch (error) {
                console.error('Error:', error);
                showErrorMessage('Terjadi kesalahan saat mengirim permintaan.');
            }
        }
    }
</script>
    
<div>
    <Sidenav />
    <main class="ml-16 mt-20"
        in:fly={{ y: 100, duration: 2000 }}
        out:fly={{ y: -50, duration: 300 }}
    >
        <!-- Menampilkan pesan berhasil -->
        <div class=" fixed top-0 z-[999999] right-4"
            
        >
            {#if successMessage}
                <div class="bg-hijau text-putih py-2 px-4 font-bold rounded-md mt-2"
                    in:fly={{ x: 100, duration: 1000 }} 
                    out:fly={{ x: 100., duration: 1000 }}
                >
                    <h1>{successMessage}</h1>
                </div>
            {/if}
            <!-- Menampilkan pesan gagal -->
            {#if errorMessage}
                <div class="bg-merah text-putih py-2 px-4 font-bold rounded-md mt-2"
                    in:fly={{ x: 100, duration: 1000 }} 
                    out:fly={{ x: 100., duration: 1000 }}
                >
                    <h1>{errorMessage}</h1>
                </div>
            {/if}
        </div>
        <!-- modal tambah -->
        {#if isOpen1}
        <div class="modal flex justify-center items-center w-full h-full z-[99999] backdrop-blur-sm  overflow-x-hidden overflow-y- fixed inset-0" 
            in:fly={{ duration: 300 }} 
            out:fly={{ duration: 300 }}
        >
            <div class="h-min modal-content w-[700px] bg-putih shadow flex items-center rounded-md" 
                in:fly={{ y: -100, duration: 1000 }} 
                out:fly={{ y: -100., duration: 300 }}
            >
                <div class="flex w-full flex-col">
                    <!-- Formulir -->
                    <div class="p-8 flex flex-col gap-4">
                        <!-- Formulir Debit -->
                        <div>
                            <div class="flex flex-col">
                                <h1 class="font-bold">Tambah Debit</h1>
                            </div>
                            <div class="flex flex-col w-full pt-4">
                                <div class="flex w-full justify-end">
                                    <button on:click={addDebitField} class="bg-hijau text-white text-putih p-2 rounded-lg mb-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                            <path d="M10.75 6.75a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" />
                                        </svg>
                                    </button>
                                </div>
                                {#each debitFields as field (field.id)}
                                <div class="w-full flex gap-4 mb-4 items-start">
                                    <div class="w-1/3 flex flex-col gap-2">
                                        <label for="comp_id_{field.id}" class="text-hitam text-xs">Comp Id</label>
                                        <input id="comp_id_{field.id}" type="text" placeholder="Comp Id" class="w-full border py-3 px-4 rounded-md border-kelima placeholder:text-xs text-xs focus:outline-none" bind:value={field.comp_id} required/>
                                    </div>
                                    <div class="w-1/3 flex flex-col gap-2">
                                        <label for="account_code_{field.id}" class="text-hitam text-xs">Account Code</label>
                                        <input id="account_code_{field.id}" type="text" placeholder="Account Code" class="w-full border py-3 px-4 rounded-md border-kelima placeholder:text-xs text-xs focus:outline-none" bind:value={field.account_code} required/>
                                    </div>
                                    <div class="w-1/3 hidden flex-col gap-2">
                                        <label for="financial_type_{field.id}" class="text-hitam text-xs">Financial Type</label>
                                        <input id="financial_type_{field.id}" type="text" placeholder="Financial Type" class="w-full border py-3 px-4 rounded-md border-kelima placeholder:text-xs text-xs focus:outline-none" bind:value={field.financial_type} required/>
                                    </div>
                                    <div class="w-1/3 flex flex-col gap-2">
                                        <label for="transaction_date_{field.id}" class="text-hitam text-xs">Transaction Date</label>
                                        <input id="transaction_date_{field.id}" type="text" placeholder="Transaction Date" class="w-full border py-3 px-4 rounded-md border-kelima placeholder:text-xs text-xs focus:outline-none" bind:value={field.transaction_date} required/>
                                    </div>
                                    <div class="w-1/3 flex flex-col gap-2">
                                        <label for="amount_{field.id}" class="text-hitam text-xs">Amount</label>
                                        <input id="amount_{field.id}" type="text" placeholder="Amount" class="w-full border py-3 px-4 rounded-md border-kelima placeholder:text-xs text-xs focus:outline-none" bind:value={field.amount} required/>
                                    </div>
                                </div>
                                {/each}
                            </div>
                        </div>
                        <!-- Formulir Kredit -->
                        <div>
                            <div class="flex flex-col">
                                <h1 class="font-bold">Tambah Kredit</h1>
                            </div>
                            <div class="flex flex-col w-full pt-4">
                                <div class="flex w-full justify-end">
                                    <button on:click={addCreditField} class="bg-hijau text-white text-putih p-2 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                            <path d="M10.75 6.75a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" />
                                        </svg>
                                    </button>
                                </div>
                                {#each creditFields as field (field.id)}
                                    <div class="w-full flex gap-4 mb-4 items-start">
                                    <div class="w-1/3 flex flex-col gap-2">
                                        <label for="comp_id_{field.id}" class="text-hitam text-xs">Comp Id</label>
                                        <input id="comp_id_{field.id}" type="text" placeholder="Comp Id" class="w-full border py-3 px-4 rounded-md border-kelima placeholder:text-xs text-xs focus:outline-none" bind:value={field.comp_id} required/>
                                    </div>
                                    <div class="w-1/3 flex flex-col gap-2">
                                        <label for="account_code_{field.id}" class="text-hitam text-xs">Account Code</label>
                                        <input id="account_code_{field.id}" type="text" placeholder="Account Code" class="w-full border py-3 px-4 rounded-md border-kelima placeholder:text-xs text-xs focus:outline-none" bind:value={field.account_code} required/>
                                    </div>
                                    <div class="w-1/3 hidden flex-col gap-2">
                                        <label for="financial_type_{field.id}" class="text-hitam text-xs">Financial Type</label>
                                        <input id="financial_type_{field.id}" type="text" placeholder="Financial Type" class="w-full border py-3 px-4 rounded-md border-kelima placeholder:text-xs text-xs focus:outline-none" bind:value={field.financial_type} required/>
                                    </div>
                                    <div class="w-1/3 flex flex-col gap-2">
                                        <label for="transaction_date_{field.id}" class="text-hitam text-xs">Transaction Date</label>
                                        <input id="transaction_date_{field.id}" type="text" placeholder="Transaction Date" class="w-full border py-3 px-4 rounded-md border-kelima placeholder:text-xs text-xs focus:outline-none" bind:value={field.transaction_date} required/>
                                    </div>
                                    <div class="w-1/3 flex flex-col gap-2">
                                        <label for="amount_{field.id}" class="text-hitam text-xs">Amount</label>
                                        <input id="amount_{field.id}" type="text" placeholder="Amount" class="w-full border py-3 px-4 rounded-md border-kelima placeholder:text-xs text-xs focus:outline-none" bind:value={field.amount} required/>
                                    </div>
                                </div>
                                {/each}
                            </div>
                        </div>
                        <button on:click={handleSubmit} class="hover:bg-[#e0ebe0] duration-300 ease-in-out w-full bg-hijau rounded-md py-2 text-putih">Submit</button>
                    </div>
                </div>
            </div>
        </div>
        {/if}
        <!-- end modal tambah -->
        <div class="flex flex-col gap-4 px-5 pt-[30px]">
            <!-- opening -->
            <div>
                <h1 class="font-bold text-utama text-xl">Jurnal Number</h1>
            </div>
            <!-- end opening -->
            <div class="flex items-start gap-8 mb-8 mt-4">
                <!-- Tabel Pembelian -->
                <div class="w-full drop-shadow-3xl shadow-sm rounded-sm bg-putih">
                    <div class="flex justify-between items-center p-4">
                        <h1 class="font-bold text-hitam text-lg">Transaksi Debit / Kredit</h1>
                        <button class=" bg-hijau hover:bg-[#e0ebe0] duration-300 ease-in-out flex items-center rounded-full px-4 py-2 gap-2 dropdown-button1" on:click={toggleDropdown1}>
                            <h1 class="font-bold text-putih text-sm ">Tambah</h1>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-putih">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                    </div>
                    <div class="w-full overflow-hidden rounded-b-md">
                        <div class="w-full overflow-x-scroll">
                            <table class="w-full">
                                <thead>
                                    <tr class="text-left text-hitam border-y bg-second border-y-kelima">
                                        <th class="px-4 py-3 text-xs">Company Id</th>
                                        <th class="px-4 py-3 text-xs">Kode akun</th>
                                        <th class="px-4 py-3 text-xs">Jenis Keuangan</th>
                                        <th class="px-4 py-3 text-xs">Jumblah</th>
                                        <th class="px-4 py-3 text-xs">Tanggal Transaksi</th>
                                        <th class="px-4 py-3 text-xs">Nama Akun</th>
                                        <th class="px-4 py-3 text-xs">Tipe Akun</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white">
                                    {#each apiData as item }
                                        <tr class="text-gray-700 border-b hover:bg-second border-b-kelima">
                                            <td class="px-4 py-3 text-xs">{item.comp_id}</td>
                                            <td class="px-4 py-3 text-xs">{item.account_code}</td>
                                            <td class="px-4 py-3 text-xs">{item.financial_type}</td>
                                            <td class="px-4 py-3 text-xs">{item.amount}</td>
                                            <td class="px-4 py-3 text-xs">{item.transaction_date}</td>
                                            <td class="px-4 py-3 text-xs">{item.account_name}</td>
                                            <td class="px-4 py-3 text-xs">{item.account_type}</td>
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