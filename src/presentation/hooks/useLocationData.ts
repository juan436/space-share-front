import { useMemo } from "react";
import locationsData from "@/presentation/data/locations.json";

interface State {
  code: string;
  name: string;
  cities: string[];
}

interface Country {
  code: string;
  name: string;
  states: State[];
}

interface LocationData {
  countries: Country[];
}

export function useLocationData(selectedCountry?: string, selectedState?: string) {
  const data = locationsData as LocationData;

  const countries = useMemo(() => {
    return data.countries.map((c) => ({ code: c.code, name: c.name }));
  }, [data.countries]);

  const states = useMemo(() => {
    if (!selectedCountry) return [];
    const country = data.countries.find((c) => c.name === selectedCountry);
    return country?.states.map((s) => ({ code: s.code, name: s.name })) || [];
  }, [data.countries, selectedCountry]);

  const cities = useMemo(() => {
    if (!selectedCountry || !selectedState) return [];
    const country = data.countries.find((c) => c.name === selectedCountry);
    const state = country?.states.find((s) => s.name === selectedState);
    return state?.cities || [];
  }, [data.countries, selectedCountry, selectedState]);

  return { countries, states, cities };
}
