import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as InfoActions from './action';
import { MainService } from '../main.service';

@Injectable()
export class InfoEffects {
  getInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InfoActions.getInfo),
      mergeMap(() => {
        return this.mainService.getInfo('pl').pipe(
          map((info) => InfoActions.getInfoSuccess({ info })),
          catchError((error) =>
            of(InfoActions.getInfoFaillure({ error: error.message })),
          ),
        );
      }),
    ),
  );

  constructor(
    private actions$: Actions,
    private mainService: MainService,
  ) {}
}
