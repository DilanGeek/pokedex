import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ResoponseTopHeadLines,
  ResoponseTopHeadLinesPokemon,
} from '../interfaces/pokemon';

const url = 'https://pokeapi.co/api/v2/';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  constructor(private httpClient: HttpClient) {}

  getPokemons = () => {
    return this.httpClient.get<ResoponseTopHeadLines>(url + 'pokemon');
  };

  getPokemonByID = (pokemonID: number) => {
    return this.httpClient.get<ResoponseTopHeadLinesPokemon>(
      url + `pokemon/${pokemonID}`
    );
  };
}
