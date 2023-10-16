<script>
    import Blobs3 from "../images/blobs/blobs03.png";
    import Blobs2 from "../images/blobs/blobs02.png";
    import Blobs1 from "../images/blobs/blobs01.png";
    import ImageL from "../images/blobs/imageL.png";
    import LogoL from "../images/logoL.svg";
    import { fly } from 'svelte/transition';

    let isPasswordVisible = false;
    let loginError = "";
    let loginSuccess = false;
    let jwtToken = "";

    // Fungsi untuk menyimpan token JWT ke localStorage
    function saveTokenToLocalStorage(Authorization) {
        localStorage.setItem('jwtToken', Authorization);
    }

    // Fungsi untuk mendapatkan token JWT dari localStorage
    function getTokenFromLocalStorage() {
        return localStorage.getItem('jwtToken');
    }

    async function togglePasswordVisibility() {
        isPasswordVisible = !isPasswordVisible;
    }

    async function handleLogin(event) {
        event.preventDefault();

        const username = event.target.username.value;
        const password = event.target.password.value;

        const requestBody = {
            username,
            password
        };

        try {
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error('Login gagal');
            }

            const data = await response.json();

            // Simpan token JWT di localStorage
            saveTokenToLocalStorage(data.access_token);

            // Set loginSuccess menjadi true dan tampilkan token JWT
            loginSuccess = true;
            jwtToken = data.access_token;

            // Bersihkan pesan kesalahan login sebelumnya
            loginError = "";

            // Redirect ke halaman dashboard setelah login berhasil
            window.location.href = 'http://localhost:5173/dashboard';

            // Tampilkan token JWT dan periksa nilai token
            console.log('Token yang diterima:', data.access_token);
            console.log('Token dari localStorage:', getTokenFromLocalStorage());
        } catch (error) {
        // Set loginSuccess menjadi false jika login gagal
        loginSuccess = false;
        loginError = 'Login gagal. Silakan periksa username dan password anda.';

        // Menambahkan timeout
        setTimeout(() => {
            loginError = '';
        }, 1500); // Timeout dalam milidetik (5000 ms atau 5 detik)
    }
    }
</script>

<div class="flex h-screen fixed w-full">
    <div class="w-[45%] bg-putih relative">
        
        <!-- Tampilkan pesan kesalahan jika ada -->
        {#if loginError} 
            <div class="duration-300 ease-in-out w-full bg-merah py-2 flex items-center justify-center absolute top-0"
                in:fly={{ y: -10, duration: 300 }}
                out:fly={{ y: -45, duration: 300 }}>
                <h1 class="max-w-xs text-putih text-center">{loginError}</h1>
            </div>
        {/if}
        <div class="flex flex-col justify-between h-screen py-12">
            <div class="flex justify-center">
                <img class="fill-pages" src={LogoL} alt="" />
            </div>
            <div class="w-full px-32 flex flex-col gap-11">
                <div class="gap-[2px]">
                    <h1 class="font-bold text-[40px] text-pages">Login</h1>
                    <span class="font-medium text-pages opacity-70">Masukkan rincian akun Anda</span>
                </div>
                <div class="">
                    <form on:submit={handleLogin}>
                        <div class="mb-4">
                            <input
                                type="text"
                                id="username"
                                placeholder="Username"
                                class="border-b placeholder:text-kedua text-pages border-b-kedua focus:outline-none py-1 w-full"
                                required
                            />
                        </div>
                        <div class="mb-11 flex relative items-center">
                            <input
                                type="{isPasswordVisible ? 'text' : 'password'}"
                                name="password"
                                id="password"
                                class="border-b placeholder:text-kedua text-pages border-b-kedua focus:outline-none py-1 w-full"
                                placeholder="Password"
                            />
                        
                            <button
                                type="button"
                                class="absolute right-0 text-blue-500 hover:underline cursor-pointer flex items-center"
                                on:click={togglePasswordVisibility}
                            >
                                {#if isPasswordVisible}
                                    <!-- Ikon mata terbuka -->
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-pages">
                                        <path
                                            d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                {:else}
                                    <!-- Ikon mata tertutup -->
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-pages">
                                        <path
                                            fill-rule="evenodd"
                                            d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z"
                                            clip-rule="evenodd"
                                        />
                                        <path
                                            d="M10.748 13.93l2.523 2.523a9.987 9.987 0 01-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 010-1.186A10.007 10.007 0 012.839 6.02L6.07 9.252a4 4 0 004.678 4.678z"
                                        />
                                    </svg>
                                {/if}
                            </button>
                        </div>
                        <button type="submit" class="hover:bg-[#f3f8f8] hover:text-pages duration-300 ease-in-out w-full py-2 rounded-md text-putih bg-pages">Login</button>
                    </form>
                </div>
            </div>
            <h1 class="text-center text-[#8A8A8A] text-sm">© 2023 GL. Seluruh Hak Dilindungi</h1>
        </div>
    </div>
    <div class=" w-[55%] bg-utama relative">
        <div
            class=" h-full py-5 relative items-center justify-between flex flex-col w-full z-10"
        >
            <div class=" text-putih flex flex-col items-start justify-start">
                <h1 class=" font-bold text-[80px]">Welcome to</h1>
                <h1 class=" text-[80px] -translate-y-14">General Ledger</h1>
                <span class=" font-medium -translate-y-[68px]"
                    >Login to access your account</span
                >
            </div>
            <img
                class=" w-[550px] absolute bottom-0 h-[400px]"
                src={ImageL}
                alt=""
            />
        </div>
        <div class=" absolute bottom-0 right-0">
            <img class=" h-[300px] w-[800px]" src={Blobs1} alt="" />
        </div>
        <div class=" absolute top-0 translate-y-44">
            <img class=" " src={Blobs2} alt="" />
        </div>
        <div class=" absolute top-0 right-0">
            <img class=" " src={Blobs3} alt="" />
        </div>
    </div>
</div>
