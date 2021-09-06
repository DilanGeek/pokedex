import { Component, OnInit } from '@angular/core';
import { PokemonService } from './services/pokemon.service';
import { Pokemon } from './interfaces/pokemon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'pokedex';
  public pokemons: Pokemon[] = [];

  // ngModel
  pokeName: any;

  constructor(private pokeServ: PokemonService) {}

  ngOnInit() {
    this.getPokemons();
  }

  getPokemons = () => {
    this.pokeServ.getPokemons().subscribe((data) => {
      this.pokemons = data.results;
      this.pokeName = '';
    });
  };

  filterPokemon = (event: any) => {
    if (this.pokeName !== '') {
      const pokemon = this.pokemons.filter((x) => x.name === this.pokeName);
      this.pokemons = pokemon;
    } else {
      this.getPokemons();
    }
  };
}
