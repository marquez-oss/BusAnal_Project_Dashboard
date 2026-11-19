
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
      sans: ['Inter', 'sans-serif'],
        },
      colors: {
      emerald: {
      750: '#047857',
      850: '#065f46',
                }
            }
        }
    }
}

//JavaScript Application Logicc
    
        // --- Mock Master Datasets ---
        const years = ['2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026'];
        
        const fertilizerTrends = {
            'Urea': [1296.32, 1150.00, 1420.50, 2450.00, 1980.00, 912.96, 1050.00, 1140.12],
            'Complete': [1269.98, 1180.00, 1310.00, 2150.00, 1750.00, 1147.21, 1190.00, 1172.30],
            'Ammosul': [766.18, 710.00, 850.00, 1350.00, 1100.00, 629.09, 640.00, 644.88],
            'Ammophos': [1111.92, 1050.00, 1200.00, 1950.00, 1600.00, 907.34, 950.00, 994.89]
        };

        const riceTrends = {
            'Well-Milled': [45.24, 43.18, 43.40, 43.58, 47.41, 55.58, 49.21, 50.50],
            'Regular-Milled': [41.16, 38.28, 38.90, 39.15, 42.80, 50.41, 42.95, 44.00],
            'Special': [54.30, 52.00, 53.10, 54.50, 57.20, 64.20, 58.96, 60.10]
        };

        const palayEconomics = {
            years: ['2022', '2023', '2024', '2025'],
            cashCosts: [30573.11, 32100.00, 34500.00, 31200.00],
            fertilizerCost: [10648.77, 8525.06, 7149.12, 6253.65],
            totalCosts: [54372.93, 56491.33, 59690.82, 55097.43],
            grossReturns: [89400.00, 92100.00, 96523.06, 92500.00],
            netReturns: [35027.07, 35608.67, 36832.24, 37402.57]
        };

        const explorerData = [
            { category: 'Fertilizer (Urea)', region: 'PHILIPPINES', indicator: 'Urea (45-0-0) / 50kg', year: '2026', value: 1140.12, status: 'Active' },
            { category: 'Fertilizer (Complete)', region: 'PHILIPPINES', indicator: 'Complete (14-14-14) / 50kg', year: '2026', value: 1172.30, status: 'Active' },
            { category: 'Fertilizer (Ammosul)', region: 'PHILIPPINES', indicator: 'Ammosul (21-0-0) / 50kg', year: '2026', value: 644.88, status: 'Active' },
            { category: 'Fertilizer (Ammophos)', region: 'PHILIPPINES', indicator: 'Ammophos (16-20-0) / 50kg', year: '2026', value: 994.89, status: 'Active' },
            { category: 'Retail Rice', region: 'PHILIPPINES', indicator: 'RICE WELL-MILLED (1 kg)', year: '2026', value: 50.50, status: 'Verified' },
            { category: 'Retail Rice', region: 'PHILIPPINES', indicator: 'RICE REGULAR-MILLED (1 kg)', year: '2026', value: 44.00, status: 'Verified' },
            { category: 'Retail Rice', region: 'PHILIPPINES', indicator: 'RICE SPECIAL (1 kg)', year: '2026', value: 60.10, status: 'Verified' },
            { category: 'Palay Economics', region: 'PHILIPPINES', indicator: 'Total Costs (₱ / ha)', year: '2025', value: 55097.43, status: 'Official' },
            { category: 'Palay Economics', region: 'PHILIPPINES', indicator: 'Net Returns (₱ / ha)', year: '2025', value: 37402.57, status: 'Official' },
            { category: 'Palay Economics', region: 'PHILIPPINES', indicator: 'Fertilizer Share Cost (₱ / ha)', year: '2025', value: 6253.65, status: 'Official' },
            { category: 'Fertilizer (Urea)', region: 'CAR', indicator: 'Urea (45-0-0) / 50kg', year: '2026', value: 1165.00, status: 'Active' },
            { category: 'Fertilizer (Complete)', region: 'CAR', indicator: 'Complete (14-14-14) / 50kg', year: '2026', value: 1195.00, status: 'Active' },
            { category: 'Retail Rice', region: 'Region III', indicator: 'RICE WELL-MILLED (1 kg)', year: '2026', value: 48.80, status: 'Verified' },
            { category: 'Retail Rice', region: 'Region VI', indicator: 'RICE WELL-MILLED (1 kg)', year: '2026', value: 47.90, status: 'Verified' },
            { category: 'Palay Economics', region: 'Region III', indicator: 'Total Costs (₱ / ha)', year: '2025', value: 58200.00, status: 'Official' }
        ];

        // --- Chart Instances ---
        let overviewTrendChart, overviewCostChart, overviewRegionalChart;
        let fertilizerGradeChart, riceTrendChart, riceComparisonChart, palayEconomicsChart;

        // --- Tab Switching Logic ---
        function switchTab(tabId) {
            document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
            document.querySelectorAll('.tab-btn').forEach(el => {
                el.classList.remove('bg-emerald-600', 'text-white', 'shadow');
                el.classList.add('text-slate-300', 'hover:text-white', 'hover:bg-slate-700');
            });

            document.getElementById('tab-' + tabId).classList.add('active');
            const activeBtn = document.getElementById('btn-' + tabId);
            activeBtn.classList.add('bg-emerald-600', 'text-white', 'shadow');
            activeBtn.classList.remove('text-slate-300', 'hover:text-white', 'hover:bg-slate-700');

            // Resize charts if needed
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'));
            }, 100);
        }

        // --- Toast Notification ---
        function showToast(message) {
            const toast = document.getElementById('toast');
            document.getElementById('toastMessage').innerText = message;
            toast.classList.remove('translate-y-20', 'opacity-0');
            setTimeout(() => {
                toast.classList.add('translate-y-20', 'opacity-0');
            }, 3000);
        }

        // --- Export Simulation ---
        function exportData(type) {
            showToast(`Successfully exported ${type.toUpperCase()} dataset as CSV.`);
        }

        function exportTableCSV() {
            showToast('Exported filtered data table to CSV.');
        }

        // --- Reset Filters ---
        function resetFilters() {
            document.getElementById('globalYear').value = '2026';
            document.getElementById('globalRegion').value = 'PHILIPPINES';
            document.getElementById('globalGrade').value = 'ALL';
            updateDashboardFilters();
            showToast('Filters reset to default.');
        }

        // --- Update Dashboard on Filter Change ---
        function updateDashboardFilters() {
            const yr = document.getElementById('globalYear').value;
            const reg = document.getElementById('globalRegion').value;
            const grade = document.getElementById('globalGrade').value;

            // Update KPI numbers dynamically based on mock adjustments
            if (yr === '2026') {
                document.getElementById('kpiFertilizer').innerText = '₱977.83';
                document.getElementById('kpiRice').innerText = '₱50.50';
                document.getElementById('kpiCosts').innerText = '₱55,097.43';
                document.getElementById('kpiReturns').innerText = '₱37,402.57';
            } else if (yr === '2024') {
                document.getElementById('kpiFertilizer').innerText = '₱907.34';
                document.getElementById('kpiRice').innerText = '₱55.58';
                document.getElementById('kpiCosts').innerText = '₱59,690.82';
                document.getElementById('kpiReturns').innerText = '₱36,832.24';
            } else if (yr === '2022') {
                document.getElementById('kpiFertilizer').innerText = '₱2,125.00';
                document.getElementById('kpiRice').innerText = '₱43.58';
                document.getElementById('kpiCosts').innerText = '₱54,372.93';
                document.getElementById('kpiReturns').innerText = '₱35,027.07';
            } else {
                document.getElementById('kpiFertilizer').innerText = '₱1,079.06';
                document.getElementById('kpiRice').innerText = '₱49.21';
                document.getElementById('kpiCosts').innerText = '₱56,413.13';
                document.getElementById('kpiReturns').innerText = '₱36,217.64';
            }

            filterTable();
            showToast(`Filters updated (Year: ${yr}, Region: ${reg})`);
        }

        // --- Table Filtering ---
        function filterTable() {
            const query = document.getElementById('tableSearch').value.toLowerCase();
            const filtered = explorerData.filter(item => 
                item.category.toLowerCase().includes(query) ||
                item.region.toLowerCase().includes(query) ||
                item.indicator.toLowerCase().includes(query) ||
                item.year.toLowerCase().includes(query)
            );

            const tbody = document.getElementById('tableBody');
            tbody.innerHTML = '';

            filtered.forEach(row => {
                const tr = document.createElement('tr');
                tr.className = 'hover:bg-slate-50 transition';
                tr.innerHTML = `
                    <td class="p-3.5 font-semibold text-slate-800">${row.category}</td>
                    <td class="p-3.5">${row.region}</td>
                    <td class="p-3.5 text-slate-600">${row.indicator}</td>
                    <td class="p-3.5">${row.year}</td>
                    <td class="p-3.5 text-right font-bold text-emerald-700">₱${row.value.toLocaleString('en-US', {minimumFractionDigits: 2})}</td>
                    <td class="p-3.5 text-center"><span class="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-[10px] font-bold">${row.status}</span></td>
                `;
                tbody.appendChild(tr);
            });
            document.getElementById('tableCount').innerText = `Showing ${filtered.length} of ${explorerData.length} records`;
        }

        // --- Initialize Charts ---
        function initCharts() {
            // 1. Overview Dual-Axis Line Chart
            const ctxOverviewTrend = document.getElementById('overviewTrendChart').getContext('2d');
            overviewTrendChart = new Chart(ctxOverviewTrend, {
                type: 'line',
                data: {
                    labels: years,
                    datasets: [
                        {
                            label: 'Urea Fertilizer (₱ / 50kg)',
                            data: fertilizerTrends['Urea'],
                            borderColor: '#059669',
                            backgroundColor: '#059669',
                            tension: 0.3,
                            yAxisID: 'y'
                        },
                        {
                            label: 'Complete Fertilizer (₱ / 50kg)',
                            data: fertilizerTrends['Complete'],
                            borderColor: '#10b981',
                            backgroundColor: '#10b981',
                            tension: 0.3,
                            yAxisID: 'y'
                        },
                        {
                            label: 'Well-Milled Rice (₱ / kg)',
                            data: riceTrends['Well-Milled'],
                            borderColor: '#3b82f6',
                            backgroundColor: '#3b82f6',
                            tension: 0.3,
                            yAxisID: 'y1'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: { mode: 'index', intersect: false },
                    scales: {
                        y: { type: 'linear', display: true, position: 'left', title: { display: true, text: 'Fertilizer Price (₱)' } },
                        y1: { type: 'linear', display: true, position: 'right', grid: { drawOnChartArea: false }, title: { display: true, text: 'Rice Price (₱)' } }
                    }
                }
            });

            // 2. Overview Cost Breakdown Chart
            const ctxOverviewCost = document.getElementById('overviewCostChart').getContext('2d');
            overviewCostChart = new Chart(ctxOverviewCost, {
                type: 'bar',
                data: {
                    labels: palayEconomics.years,
                    datasets: [
                        { label: 'Fertilizer Cost (₱/ha)', data: palayEconomics.fertilizerCost, backgroundColor: '#10b981' },
                        { label: 'Other Cash Costs (₱/ha)', data: palayEconomics.cashCosts.map((c, i) => c - palayEconomics.fertilizerCost[i]), backgroundColor: '#64748b' }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: { x: { stacked: true }, y: { stacked: true } }
                }
            });

            // 3. Overview Regional Chart
            const ctxOverviewRegional = document.getElementById('overviewRegionalChart').getContext('2d');
            overviewRegionalChart = new Chart(ctxOverviewRegional, {
                type: 'bar',
                data: {
                    labels: ['NCR', 'CAR', 'Region I', 'Region III', 'Region VI', 'Region XI', 'BARMM'],
                    datasets: [{
                        label: 'Average Fertilizer Price (₱)',
                        data: [1220, 1165, 1080, 1050, 1110, 1140, 1190],
                        backgroundColor: '#047857'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: 'y',
                }
            });

            // 4. Fertilizer Grade Chart
            const ctxFertilizerGrade = document.getElementById('fertilizerGradeChart').getContext('2d');
            fertilizerGradeChart = new Chart(ctxFertilizerGrade, {
                type: 'line',
                data: {
                    labels: years,
                    datasets: [
                        { label: 'Urea (45-0-0)', data: fertilizerTrends['Urea'], borderColor: '#059669', tension: 0.3 },
                        { label: 'Complete (14-14-14)', data: fertilizerTrends['Complete'], borderColor: '#2563eb', tension: 0.3 },
                        { label: 'Ammophos (16-20-0)', data: fertilizerTrends['Ammophos'], borderColor: '#d97706', tension: 0.3 },
                        { label: 'Ammosul (21-0-0)', data: fertilizerTrends['Ammosul'], borderColor: '#9333ea', tension: 0.3 }
                    ]
                },
                options: { responsive: true, maintainAspectRatio: false }
            });

            // 5. Rice Trend Chart
            const ctxRiceTrend = document.getElementById('riceTrendChart').getContext('2d');
            riceTrendChart = new Chart(ctxRiceTrend, {
                type: 'line',
                data: {
                    labels: years,
                    datasets: [
                        { label: 'Special Rice', data: riceTrends['Special'], borderColor: '#7c3aed', tension: 0.3 },
                        { label: 'Well-Milled Rice', data: riceTrends['Well-Milled'], borderColor: '#2563eb', tension: 0.3 },
                        { label: 'Regular-Milled Rice', data: riceTrends['Regular-Milled'], borderColor: '#059669', tension: 0.3 }
                    ]
                },
                options: { responsive: true, maintainAspectRatio: false }
            });

            // 6. Rice Comparison Chart
            const ctxRiceComparison = document.getElementById('riceComparisonChart').getContext('2d');
            riceComparisonChart = new Chart(ctxRiceComparison, {
                type: 'bar',
                data: {
                    labels: ['Regular-Milled', 'Well-Milled', 'Special'],
                    datasets: [
                        { label: '2019', data: [41.16, 45.24, 54.30], backgroundColor: '#94a3b8' },
                        { label: '2026', data: [44.00, 50.50, 60.10], backgroundColor: '#059669' }
                    ]
                },
                options: { responsive: true, maintainAspectRatio: false }
            });

            // 7. Palay Economics Chart
            const ctxPalayEconomics = document.getElementById('palayEconomicsChart').getContext('2d');
            palayEconomicsChart = new Chart(ctxPalayEconomics, {
                type: 'bar',
                data: {
                    labels: palayEconomics.years,
                    datasets: [
                        { label: 'Total Production Costs', data: palayEconomics.totalCosts, backgroundColor: '#ef4444' },
                        { label: 'Gross Returns', data: palayEconomics.grossReturns, backgroundColor: '#3b82f6' },
                        { label: 'Net Returns (Profit)', data: palayEconomics.netReturns, backgroundColor: '#10b981' }
                    ]
                },
                options: { responsive: true, maintainAspectRatio: false }
            });
        }

        // Run initialization on window load
        window.onload = function() {
            initCharts();
            filterTable();
        };