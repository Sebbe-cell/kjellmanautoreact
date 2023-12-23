interface IVehicleData {
  created?: string[]
  monthlyPrice?: number,
  headline: string[],
  miles: [
    {
      _: string
      $: {
        value: string
      }
    }
  ]
  gearbox: string[]
  color: string[]
  description: string[]
  brand: string[]
  primaryfuel: string[]
  model: string[]
  modelyear: string[]
  price: [
    {
      _: string
      $: {
        value: string
      }
    }
  ]
  $: {
    id: string,
    locationid: string,
  },
  image: [
    {
      $: {
        index: string,
        showh2h: string,
      },
      thumb: string[],
      main: string[],
      large: string[],
    },
  ],
}


interface IAlteredVehicleData {
  headline: string[];
  miles: {
    _: string;
    $: {
      value: string;
    };
  }[];
  gearbox: string[];
  primaryfuel: string[];
  modelyear: string[];
  price: {
    _: string;
    $: {
      value: string;
    };
  }[];
  $: {
    id: string;
    locationid: string;
  };
  image: {
    $: {
      index: string;
      showh2h: string;
    };
    thumb: string[];
    main: string[];
    large: string[];
  }[];
}


export type { IVehicleData, IAlteredVehicleData };