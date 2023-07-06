/* eslint-disable @typescript-eslint/no-unused-vars */
import { Control, ControlOptions } from 'leaflet';

declare module 'leaflet' {
  namespace control {
    function search(options?: ControlOptions): Control.Search;
  }

  namespace Control {
    class Search extends Control {
      constructor(options?: ControlOptions);

      setSearchText(text: string): void;
    }
  }
}
