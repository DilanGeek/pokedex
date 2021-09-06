import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PokemonService } from '../../services/pokemon.service';
import { Move, Ability, Species } from '../../interfaces/pokemon';

const urlImg =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  @Input() pokemonData: any;
  public pokemonId: number = 0;
  public pokeName: string = '';

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      data: this.pokemonData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit() {
    let url = this.pokemonData.url.split('/');
    this.pokemonId = parseInt(url[6]);
    this.pokeName = this.pokemonData.name;
    this.getImg();
  }

  getImg = () => {
    return `${urlImg}/${this.pokemonId}.png`;
  };

  upperString = (): string => {
    if (typeof this.pokeName[0] !== 'undefined') {
      return this.pokeName[0].toUpperCase() + this.pokeName.slice(1);
    }
    return '';
  };
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'card-data.component.html',
})
export class DialogContentExampleDialog implements OnInit {
  public pokemonMoves: Move[] = [];
  public pokemonAbilities: Ability[] = [];
  public pokemonId: number = 0;
  public pokeName: string = '';


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private pokeServ: PokemonService
  ) {}

  ngOnInit() {
    let url = this.data.url.split('/');
    this.pokemonId = parseInt(url[6]);
    this.getImg();
    this.findPokemon(this.pokemonId);
  }

  findPokemon = (pokemonId: number) => {
    this.pokeServ.getPokemonByID(pokemonId).subscribe((data) => {
      this.pokemonMoves = data.moves;
      this.pokemonAbilities = data.abilities;
      this.pokeName = data.name;
    });
  };

  getImg = () => {
    return `${urlImg}/${this.pokemonId}.png`;
  };

  abilities = () => {
    let abilities: any[] = [];

    this.pokemonAbilities.map((v) => {
      abilities.push(v.ability.name);
    });

    return abilities.slice(0, 4);
  };

  moves = () => {
    let moves: any[] = [];

    this.pokemonMoves.map((v) => {
      moves.push(v.move.name);
    });

    return moves.slice(0, 5);
  };

  upperString = (): string => {
    if (typeof this.pokeName[0] !== 'undefined') {
      return this.pokeName[0].toUpperCase() + this.pokeName.slice(1);
    }
    return '';
  };
}
