<script>
    import {onMount} from 'svelte'  
    import Chart from 'chart.js/auto';

    let ctx    

    onMount(
        async ()=> {
            var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni'],
                datasets: [
                    {
                        label: 'Total Orders',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            '#588157',
                        ],
                        borderColor: [
                            '#588157',
                        ],
                        borderWidth: 3,
                    },
                    {
                        label: 'Total Products', // Label untuk line baru
                        data: [20, 15, 10, 8, 12, 18], // Data untuk line baru
                        backgroundColor: [
                            '#d8572a', // Warna latar belakang untuk line baru
                        ],
                        borderColor: [
                            '#d8572a', // Warna garis untuk line baru
                        ],
                        borderWidth: 3,
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
            
        });
    }
    
)
</script>

<canvas id="myChart" class=" w-full h-48" bind:this={ctx}></canvas>

