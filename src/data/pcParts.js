export const pcParts = {
  cpu: [
    {
      id: 'cpu1',
      name: 'Intel Core i5-13600K',
      price: 579.99,
      socket: 'LGA1700',
      tdp: 125,
      cores: 14,
      threads: 20,
      baseSpeed: 3.5,
      maxSpeed: 5.1,
      description: 'Great for gaming and productivity'
    },
    {
      id: 'cpu2',
      name: 'AMD Ryzen 7 7800X3D',
      price: 814.99,
      socket: 'AM5',
      tdp: 120,
      cores: 8,
      threads: 16,
      baseSpeed: 4.2,
      maxSpeed: 5.0,
      description: 'Best gaming CPU with 3D V-Cache'
    },
    {
      id: 'cpu3',
      name: 'Intel Core i9-13900K',
      price: 1067.99,
      socket: 'LGA1700',
      tdp: 125,
      cores: 24,
      threads: 32,
      baseSpeed: 3.0,
      maxSpeed: 5.8,
      description: 'Top-tier CPU for gaming and workstation'
    },
    {
      id: 'cpu4',
      name: 'AMD Ryzen 5 7600X',
      price: 452.99,
      socket: 'AM5',
      tdp: 105,
      cores: 6,
      threads: 12,
      baseSpeed: 4.7,
      maxSpeed: 5.3,
      description: 'Great value for gaming'
    },
    {
      id: 'cpu5',
      name: 'Intel Core i7-13700K',
      price: 760.99,
      socket: 'LGA1700',
      tdp: 125,
      cores: 16,
      threads: 24,
      baseSpeed: 3.4,
      maxSpeed: 5.4,
      description: 'Excellent for gaming and multitasking'
    }
  ],
  motherboard: [
    {
      id: 'mb1',
      name: 'MSI MPG B650 GAMING X AX',
      price: 416.99,
      socket: 'AM5',
      chipset: 'B650',
      formFactor: 'ATX',
      maxRam: 128,
      ramSlots: 4,
      description: 'Great value AM5 motherboard'
    },
    {
      id: 'mb2',
      name: 'ASUS ROG STRIX Z790-E GAMING',
      price: 904.99,
      socket: 'LGA1700',
      chipset: 'Z790',
      formFactor: 'ATX',
      maxRam: 128,
      ramSlots: 4,
      description: 'Premium Intel motherboard'
    },
    {
      id: 'mb3',
      name: 'GIGABYTE B650M AORUS ELITE AX',
      price: 343.99,
      socket: 'AM5',
      chipset: 'B650',
      formFactor: 'mATX',
      maxRam: 128,
      ramSlots: 4,
      description: 'Compact AM5 motherboard'
    },
    {
      id: 'mb4',
      name: 'MSI PRO Z690-A WIFI',
      price: 506.99,
      socket: 'LGA1700',
      chipset: 'Z690',
      formFactor: 'ATX',
      maxRam: 128,
      ramSlots: 4,
      description: 'Value Intel motherboard'
    },
    {
      id: 'mb5',
      name: 'ASRock X670E Taichi',
      price: 814.99,
      socket: 'AM5',
      chipset: 'X670E',
      formFactor: 'ATX',
      maxRam: 128,
      ramSlots: 4,
      description: 'Premium AM5 motherboard'
    }
  ],
  ram: [
    {
      id: 'ram1',
      name: 'G.SKILL Trident Z5 RGB 32GB (2x16GB)',
      price: 343.99,
      speed: 6000,
      type: 'DDR5',
      latency: 'CL36',
      description: 'High-performance RGB RAM'
    },
    {
      id: 'ram2',
      name: 'Corsair Vengeance 32GB (2x16GB)',
      price: 289.99,
      speed: 5600,
      type: 'DDR5',
      latency: 'CL36',
      description: 'Reliable performance RAM'
    },
    {
      id: 'ram3',
      name: 'TeamGroup T-Force Delta RGB 32GB (2x16GB)',
      price: 307.99,
      speed: 6000,
      type: 'DDR5',
      latency: 'CL38',
      description: 'Stylish RGB RAM'
    },
    {
      id: 'ram4',
      name: 'Crucial Pro 32GB (2x16GB)',
      price: 271.99,
      speed: 5600,
      type: 'DDR5',
      latency: 'CL40',
      description: 'Value-oriented RAM'
    },
    {
      id: 'ram5',
      name: 'Kingston Fury Beast RGB 32GB (2x16GB)',
      price: 325.99,
      speed: 6000,
      type: 'DDR5',
      latency: 'CL40',
      description: 'Balanced performance RAM'
    }
  ],
  gpu: [
    {
      id: 'gpu1',
      name: 'NVIDIA GeForce RTX 4070 Ti',
      price: 1447.99,
      vram: 12,
      memoryType: 'GDDR6X',
      powerDraw: 285,
      length: 305, // mm
      description: 'Great 1440p gaming performance'
    },
    {
      id: 'gpu2',
      name: 'AMD Radeon RX 7900 XT',
      price: 1628.99,
      vram: 20,
      memoryType: 'GDDR6',
      powerDraw: 315,
      length: 287, // mm
      description: 'Excellent 4K gaming performance'
    },
    {
      id: 'gpu3',
      name: 'NVIDIA GeForce RTX 4080',
      price: 2171.99,
      vram: 16,
      memoryType: 'GDDR6X',
      powerDraw: 320,
      length: 304, // mm
      description: 'Premium 4K gaming performance'
    },
    {
      id: 'gpu4',
      name: 'AMD Radeon RX 7800 XT',
      price: 995.99,
      vram: 16,
      memoryType: 'GDDR6',
      powerDraw: 263,
      length: 280, // mm
      description: 'Great value 1440p gaming'
    },
    {
      id: 'gpu5',
      name: 'NVIDIA GeForce RTX 4070 Super',
      price: 1085.99,
      vram: 12,
      memoryType: 'GDDR6X',
      powerDraw: 200,
      length: 242, // mm
      description: 'Solid 1440p gaming performance'
    }
  ],
  storage: [
    {
      id: 'storage1',
      name: 'Samsung 990 PRO 2TB',
      price: 325.99,
      type: 'NVMe',
      interface: 'PCIe 4.0',
      readSpeed: 7450,
      writeSpeed: 6900,
      description: 'Top-tier NVMe SSD'
    },
    {
      id: 'storage2',
      name: 'WD Black SN850X 2TB',
      price: 289.99,
      type: 'NVMe',
      interface: 'PCIe 4.0',
      readSpeed: 7300,
      writeSpeed: 6600,
      description: 'Excellent gaming SSD'
    },
    {
      id: 'storage3',
      name: 'Crucial P5 Plus 2TB',
      price: 271.99,
      type: 'NVMe',
      interface: 'PCIe 4.0',
      readSpeed: 6600,
      writeSpeed: 5000,
      description: 'Great value NVMe SSD'
    },
    {
      id: 'storage4',
      name: 'Seagate FireCuda 530 2TB',
      price: 307.99,
      type: 'NVMe',
      interface: 'PCIe 4.0',
      readSpeed: 7300,
      writeSpeed: 6900,
      description: 'Reliable gaming SSD'
    },
    {
      id: 'storage5',
      name: 'Corsair MP600 PRO 2TB',
      price: 343.99,
      type: 'NVMe',
      interface: 'PCIe 4.0',
      readSpeed: 7100,
      writeSpeed: 6800,
      description: 'Premium gaming SSD'
    }
  ],
  psu: [
    {
      id: 'psu1',
      name: 'Corsair RM850x',
      price: 271.99,
      wattage: 850,
      efficiency: '80+ Gold',
      modularity: 'Full',
      description: 'Reliable high-wattage PSU'
    },
    {
      id: 'psu2',
      name: 'EVGA SuperNOVA 1000 GT',
      price: 325.99,
      wattage: 1000,
      efficiency: '80+ Gold',
      modularity: 'Full',
      description: 'High-wattage gaming PSU'
    },
    {
      id: 'psu3',
      name: 'Seasonic FOCUS GX-850',
      price: 253.99,
      wattage: 850,
      efficiency: '80+ Gold',
      modularity: 'Full',
      description: 'Quality mid-range PSU'
    },
    {
      id: 'psu4',
      name: 'be quiet! Straight Power 11 1000W',
      price: 343.99,
      wattage: 1000,
      efficiency: '80+ Platinum',
      modularity: 'Full',
      description: 'Premium quiet PSU'
    },
    {
      id: 'psu5',
      name: 'Thermaltake Toughpower GF1 850W',
      price: 235.99,
      wattage: 850,
      efficiency: '80+ Gold',
      modularity: 'Full',
      description: 'Value gaming PSU'
    }
  ],
  case: [
    {
      id: 'case1',
      name: 'Lian Li O11 Dynamic EVO',
      price: 307.99,
      formFactor: 'Mid Tower',
      maxGpuLength: 420,
      maxCpuCoolerHeight: 167,
      description: 'Premium airflow case'
    },
    {
      id: 'case2',
      name: 'Phanteks Eclipse P500A',
      price: 253.99,
      formFactor: 'Mid Tower',
      maxGpuLength: 435,
      maxCpuCoolerHeight: 190,
      description: 'Great airflow case'
    },
    {
      id: 'case3',
      name: 'Corsair 4000D Airflow',
      price: 171.99,
      formFactor: 'Mid Tower',
      maxGpuLength: 360,
      maxCpuCoolerHeight: 170,
      description: 'Value airflow case'
    },
    {
      id: 'case4',
      name: 'Fractal Design Meshify 2',
      price: 289.99,
      formFactor: 'Mid Tower',
      maxGpuLength: 385,
      maxCpuCoolerHeight: 185,
      description: 'Premium mesh case'
    },
    {
      id: 'case5',
      name: 'NZXT H510 Flow',
      price: 162.99,
      formFactor: 'Mid Tower',
      maxGpuLength: 365,
      maxCpuCoolerHeight: 165,
      description: 'Compact airflow case'
    }
  ]
};

// Compatibility rules
export const compatibilityRules = {
  cpuMotherboard: (cpu, motherboard) => {
    return cpu.socket === motherboard.socket;
  },
  ramMotherboard: (ram, motherboard) => {
    return ram.type === 'DDR5'; // All motherboards in our list support DDR5
  },
  psuWattage: (totalPowerDraw, psu) => {
    // Add 20% headroom for power supply
    return psu.wattage >= totalPowerDraw * 1.2;
  },
  gpuCase: (gpu, case_) => {
    return gpu.length <= case_.maxGpuLength;
  }
};

// Calculate total power draw
export const calculateTotalPowerDraw = (parts) => {
  let total = 0;
  if (parts.cpu) total += parts.cpu.tdp;
  if (parts.gpu) total += parts.gpu.powerDraw;
  // Add base power for other components
  total += 100; // Base power for motherboard, RAM, storage, etc.
  return total;
};

// Assign tiers to CPUs and GPUs for bottleneck logic
const cpuTiers = {
  'cpu1': 2, // Intel Core i5-13600K
  'cpu2': 3, // AMD Ryzen 7 7800X3D
  'cpu3': 4, // Intel Core i9-13900K
  'cpu4': 1, // AMD Ryzen 5 7600X
  'cpu5': 3  // Intel Core i7-13700K
};
const gpuTiers = {
  'gpu1': 3, // RTX 4070 Ti
  'gpu2': 4, // RX 7900 XT
  'gpu3': 4, // RTX 4080
  'gpu4': 2, // RX 7800 XT
  'gpu5': 2  // RTX 4070 Super
};

// Check for bottlenecks
export const checkBottlenecks = (parts) => {
  const bottlenecks = [];
  if (parts.cpu && parts.gpu) {
    const cpuTier = cpuTiers[parts.cpu.id] || 2;
    const gpuTier = gpuTiers[parts.gpu.id] || 2;
    if (cpuTier + 2 <= gpuTier) {
      bottlenecks.push('CPU might bottleneck GPU performance');
    } else if (gpuTier + 2 <= cpuTier) {
      bottlenecks.push('GPU might bottleneck CPU performance');
    }
  }
  if (parts.ram && parts.cpu) {
    if (parts.ram.speed < 5600 && parts.cpu.cores >= 8) {
      bottlenecks.push('RAM speed might limit CPU performance');
    }
  }
  return bottlenecks;
};