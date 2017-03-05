import { Headers } from '@angular/http';

export const authenticatedContentHeaders = new Headers();
authenticatedContentHeaders.append('Accept', 'application/json');
authenticatedContentHeaders.append('Content-Type', 'application/json');
var token=localStorage.getItem('id_token');
authenticatedContentHeaders.append('Authorization',token);
