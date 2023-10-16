<script>
    import Chart from "../../components/chart.svelte";
    import Sidenav from "../../components/sidenav.svelte";
    import { onMount, onDestroy } from "svelte";
    import { fly } from 'svelte/transition';

    let currentDate = new Date();
    function updateDate() {
        currentDate = new Date();
    }

    // Pembaruan tanggal setiap detik (1000ms)
    const interval = setInterval(updateDate, 1000);

    // Hentikan interval saat komponen dihancurkan
    onDestroy(() => {
        clearInterval(interval);
    });

    // animasi loading nomor 
    let number1 = 0;
    let number2 = 0;
    let number3 = 0;
    let number4 = 0;
    let totalSales = 0;

    let username = ""; // Tambahkan variabel username

    onMount(async () => {
        const endValue1 = 600;
        const endValue2 = 800;
        const endValue3 = 2765;
        const endValue4 = 678;
        const sales = 4300;
        const duration = 2000;

        const start = Date.now();

        const updateNumbers = () => {
            const currentTime = Date.now();
            const progress = Math.min(1, (currentTime - start) / duration);

            number1 = Math.floor(progress * endValue1);
            number2 = Math.floor(progress * endValue2);
            number3 = Math.floor(progress * endValue3);
            number4 = Math.floor(progress * endValue4);
            totalSales = Math.floor(progress * sales);

            if (progress < 1) {
                requestAnimationFrame(updateNumbers);
            }
        };

        requestAnimationFrame(updateNumbers);

        // Pemanggilan API untuk mendapatkan username
        try {
            const response = await fetch('http://localhost:8000/api/profile', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                }
            });
            
            if (!response.ok) {
                throw new Error('Gagal mendapatkan data pengguna');
            }
            const data = await response.json();
            username = data.username;
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
        }
    });
</script>

<div>
    <Sidenav />
    <main class="ml-16 mt-20 "
        in:fly={{ y: 100, duration: 2000 }}
        out:fly={{ y: -50, duration: 300 }}
    >
        <div class="flex flex-col gap-4 px-5 py-[30px]">
            <!-- opening -->
            <div>
                <h1 class="font-bold text-utama text-xl">Ledger Dashboard</h1>
            </div>
            <!-- end opening -->
            <div class="w-full drop-shadow-3xl shadow-sm rounded-sm bg-putih">
                <div class=" p-5 flex items-center justify-between">
                    <h1 class=" font-bold text-hitam">Hello, <span>{username}</span>!</h1>
                    <div class=" flex items-center gap-4">
                        <div class=" bg-opacity flex items-start gap-3 px-6 py-2 rounded-md">
                            <h1 class=" text-utama text-sm font-medium">Date: <span>{currentDate.toLocaleDateString()}</span></h1>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[18px] h-w-[18px] text-utama">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                            </svg>
                        </div>
                        <div class=" bg-opacity flex items-start gap-3 px-6 py-2 rounded-md">
                            <h1 class=" text-utama text-sm font-medium">Time: <span>{currentDate.toLocaleTimeString()}</span></h1>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[18px] h-w-[18px] text-utama">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <!-- card -->
            <div class=" grid grid-cols-4 gap-8">
                <div class=" flex items-center w-full justify-between px-8 py-6 bg-pages rounded-md">
                    <div class=" w-16 h-16 bg-putih flex items-center justify-center rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 animate-bounce text-pages">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                        </svg>
                    </div>
                    <div class=" flex gap-2 flex-col">
                        <span class=" text-putih font-medium">Total Traffic</span>
                        <h1 class=" font-bold text-putih text-2xl">{number1}</h1>
                    </div>
                </div>
                <div class=" flex items-center w-full justify-between px-8 py-6 bg-card2 rounded-md">
                    <div class=" w-16 h-16 bg-putih flex items-center justify-center rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 animate-bounce text-card2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                    </div>
                    <div class=" flex gap-2 flex-col">
                        <span class=" text-putih font-medium">Total Orders</span>
                        <h1 class=" font-bold text-putih text-2xl">{number2}</h1>
                    </div>
                </div>
                <div class=" flex items-center w-full justify-between px-8 py-6 bg-card3 rounded-md">
                    <div class=" w-16 h-16 bg-putih flex items-center justify-center rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 animate-bounce text-card3">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                        </svg>
                    </div>
                    <div class=" flex gap-2 flex-col">
                        <span class=" text-putih font-medium">New Customers</span>
                        <h1 class=" font-bold text-putih text-2xl">{number3}</h1>
                    </div>
                </div>
                <div class=" flex items-center w-full justify-between px-8 py-6 bg-card4 rounded-md">
                    <div class=" w-16 h-16 bg-putih flex items-center justify-center rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 animate-bounce text-card4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                        </svg>
                    </div>
                    <div class=" flex gap-2 flex-col">
                        <span class=" text-putih font-medium">Total Products</span>
                        <h1 class=" font-bold text-putih text-2xl">{number4}</h1>
                    </div>
                </div>
            </div>
            <!-- end card -->
            <!-- profit & visit -->
            <!-- <div class=" flex items-start gap-8">
                <div class=" w-4/6 drop-shadow-3xl flex flex-col gap-4 p-5 shadow-sm rounded-sm bg-putih">
                    <h1 class=" font-bold text-hitam">Sales By Profit</h1>
                    <div class=" w-full justify-between flex items-center rounded-md p-5 bg-kelima">
                        <div class=" flex flex-col">
                            <h1 class=" text-3xl font-bold">{totalSales}</h1>
                            <span class=" text-card2">Total Sales</span>
                        </div>
                        <div class=" flex gap-4">
                            <div class=" flex items-start gap-2">
                                <span class=" w-4 h-[17px] rounded-full bg-card2"></span>
                                <div class=" flex flex-col -translate-y-[6px]">
                                    <span class=" font-bold text-hitam">Total Orders</span>
                                    <div class=" flex items-center gap-2">
                                        <div class=" flex items-center text-card2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                                <path fill-rule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clip-rule="evenodd" />
                                            </svg>
                                            <span class="text-sm font-bold">17%</span>
                                        </div>
                                        <span class=" text-sm text-hitam">this month</span>
                                    </div>
                                </div>
                            </div>
                            <div class=" flex items-start gap-2">
                                <span class=" w-4 h-[17px] rounded-full bg-card4"></span>
                                <div class=" flex flex-col -translate-y-[6px]">
                                    <span class=" font-bold text-hitam">Total Products</span>
                                    <div class=" flex items-center gap-2">
                                        <div class=" flex items-center text-[#9d0208]">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 rotate-180">
                                                <path fill-rule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clip-rule="evenodd" />
                                            </svg>
                                            <span class="text-sm font-bold">17%</span>
                                        </div>
                                        <span class=" text-sm text-hitam">this month</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Chart />
                </div>
                <div class=" w-4/12 drop-shadow-3xl p-5 shadow-sm rounded-sm bg-putih">
                    <h1 class=" font-bold text-hitam">Visit By Country</h1>
                </div>
            </div> -->
            <!-- end profit & visit -->
        </div>
    </main>
</div>
