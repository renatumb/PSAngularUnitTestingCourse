import {ComponentFixture, TestBed} from '@angular/core/testing';

import {Component, Directive, EventEmitter, Input, NO_ERRORS_SCHEMA, Output} from '@angular/core';
import {HeroesComponent} from './heroes.component';
import {HeroService} from '../hero.service';
import {of} from 'rxjs/internal/observable/of';
import {Hero} from '../hero';
import {HeroComponent} from '../hero/hero.component';
import {By} from '@angular/platform-browser';

@Directive({
  selector: '[routerLink]',
  host: {'(click)': 'onClick()'}
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

describe('HeroesComponent - DEEP test', () => {

  let fixture: ComponentFixture<HeroesComponent>;
  let MockHeroService;

  let HEROES = [
    {id: 1, name: 'SpiderDude1', strength: 1},
    {id: 2, name: 'SpiderDude2', strength: 5},
    {id: 3, name: 'SpiderDude3', strength: 10},
  ];


  beforeEach(() => {
    MockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    HEROES = [
      {id: 1, name: 'SpiderDude1', strength: 1},
      {id: 2, name: 'SpiderDude2', strength: 5},
      {id: 3, name: 'SpiderDude3', strength: 10},
    ];

    TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroComponent, RouterLinkDirectiveStub],
      providers: [
        {provide: HeroService, useValue: MockHeroService}
      ],
      //schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroesComponent);

  });

  it('Should set heroes correctly from the serviceXX', () => {
    MockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));

    for (let i = 0; i < heroComponentDEs.length; i++) {
      expect(heroComponentDEs[i].componentInstance.hero).toEqual(HEROES[i]);
    }
  });

  it('Should call heroService.deleteHero when the hero compoent\'s button is clicked ', () => {
    MockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    spyOn(fixture.componentInstance, 'deleteHero'); /// It watches the method on the component -->> HeroesComponent.delete
                                                            // which is checked in expect(...) line

    const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));

    let eventObject = {
      stopPropagation: () => {
        console.log(new Date() + ' INSIDE eventObject.stopPropagation()');
      }
    };
    heroComponentDEs[0].queryAll(By.css('button'))[0].triggerEventHandler('click', eventObject); // Trigger the event
                                                 // manually: IT is the same as clicking... IT meas going thru HeroComponent.onDeleteClick()

    (<HeroComponent>heroComponentDEs[0].componentInstance).delete.emit(); // IT just emitting the event which is captured by the
                                                                          // parent html template in '(delete)="deleteHero(hero)'

    heroComponentDEs[0].triggerEventHandler('delete', null); // Triggering event '(delete)="deleteHero(hero)'

    expect(fixture.componentInstance.deleteHero).toHaveBeenCalledWith(HEROES[0]); //
  });

  it('Should add a new hero to the Hero List when the add button is clicked', () => {
    MockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    const nameToBeadded = 'MR catra';
    const heroToreturn: Hero = {strength: 9, name: nameToBeadded, id: 9};
    MockHeroService.addHero.and.returnValue(of(heroToreturn));

    const inputField = fixture.debugElement.query( By.css('input') ).nativeElement;
    const addButton = fixture.debugElement.queryAll( By.css('button') )[0];

    inputField.value =nameToBeadded;
    addButton.triggerEventHandler('click', null);
    fixture.detectChanges();


    const content = fixture.debugElement.query( By.css('ul')).nativeElement.textContent;
    console.warn('here 10');
    console.log(content);
    expect(content).toContain(nameToBeadded);
  });

  it('Should have the correct router for the first Hero', () => {
    MockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent))[0];

    const routerLink = heroComponentDEs.queryAll(By.directive(RouterLinkDirectiveStub))[0];
    console.warn('xxx');
    console.log(heroComponentDEs.nativeElement);

    const injected = routerLink.injector.get(RouterLinkDirectiveStub);
    console.log(injected);

    heroComponentDEs.queryAll(By.css('a'))[0].triggerEventHandler('click',null);
    console.log(injected);

    expect( injected.navigatedTo).toBe('/detail/1');
  });
});
