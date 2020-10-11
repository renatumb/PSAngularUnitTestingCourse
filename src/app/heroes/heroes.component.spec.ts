import {HeroesComponent} from './heroes.component';
import {HeroService} from '../hero.service';
import {of} from 'rxjs/internal/observable/of';

describe('Hero Component', () => {

  let heroesComponent: HeroesComponent;
  let HEROES;
  let heroService;

  beforeEach(() => {
    HEROES = [
      {id: 1, name: 'SpiderDude1', strength: 1},
      {id: 2, name: 'SpiderDude2', strength: 5},
      {id: 3, name: 'SpiderDude3', strength: 10},
    ];

    heroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    heroesComponent = new HeroesComponent(heroService);
  });

  it('Should remove the indicated Hero from the Heroes list ', () => {
    heroesComponent.heroes = HEROES;
    heroService.deleteHero.and.returnValue(of(true));
    heroesComponent.deleteHero(HEROES[0]);
    expect(heroesComponent.heroes.length).toBe(2);
  });

  it('Should call Delete Hero ', () => {
    heroesComponent.heroes = HEROES;
    heroService.deleteHero.and.returnValue(of(true));
    heroesComponent.deleteHero(HEROES[0]);

     expect(heroService.deleteHero).toHaveBeenCalledWith( HEROES[0] );
  });
});
