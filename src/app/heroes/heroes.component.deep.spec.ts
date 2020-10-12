import {ComponentFixture, TestBed} from '@angular/core/testing';

import {Component, EventEmitter, Input, NO_ERRORS_SCHEMA, Output} from '@angular/core';
import {HeroesComponent} from './heroes.component';
import {HeroService} from '../hero.service';
import {of} from 'rxjs/internal/observable/of';
import {Hero} from '../hero';
import {HeroComponent} from '../hero/hero.component';
import {By} from '@angular/platform-browser';

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
      declarations: [HeroesComponent, HeroComponent],
      providers: [
        {provide: HeroService, useValue: MockHeroService}
      ],
      schemas: [NO_ERRORS_SCHEMA]
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
});
