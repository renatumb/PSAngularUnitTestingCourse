import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HeroDetailComponent} from './hero-detail.component';
import {ActivatedRoute} from '@angular/router';
import {HeroService} from '../hero.service';
import {Location} from '@angular/common';
import {of} from 'rxjs/internal/observable/of';
import {Hero} from '../hero';
import {FormsModule} from '@angular/forms';

describe('Hero Detail Component', () => {

  let mockActivatedRoute, mockHeroService, mockLocation;
  let fixtureHeroDetailComponent: ComponentFixture<HeroDetailComponent>;

  beforeEach(() => {

    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => {
            return 3;
          }
        }
      }
    };
    mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
    mockLocation = jasmine.createSpyObj(['back']);

    TestBed.configureTestingModule({
      imports: FormsModule,
      declarations: [HeroDetailComponent],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: HeroService, useValue: mockHeroService},
        {provide: Location, useValue: mockLocation}
      ]
    });
    fixtureHeroDetailComponent = TestBed.createComponent(HeroDetailComponent);
  });

  it('should render the hero name in a h2 tag', () => {
    let heroObject: Hero = {id: 10, name: 'pedro Bola', strength: 100};
    mockHeroService.getHero.and.returnValue(of(heroObject));

    fixtureHeroDetailComponent.detectChanges();

    let textFromH2 = fixtureHeroDetailComponent.nativeElement.querySelector('h2').textContent;
    console.warn('h2 tag');
    console.log(textFromH2);

    expect( textFromH2).toContain( heroObject.name.toUpperCase() ) ;
  });

});
