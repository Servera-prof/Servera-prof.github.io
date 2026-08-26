README
======

- Cada carpeta ha de ser autònoma excepte pel:
    + texme.js
    + marked.js
    + mathjax.js
    + css

- Les llibreries dels programes en JS que són vàlids per varies 
  carpetes s'enumeren a continuació:
    + test
    + comprovador
    + matemàtiques
    
 - Codificació dels exàmens: AANNSS_UTMM_stringNom
    + AA: any
    + NN: número correlatiu
    + SS: part de l'examen a, b, c, inclus a1, a2 (en casos concrets,
      com el cas d'un test i el seu comprovador)
    + UTMM: ut seguit del número d'ut d'aquell any (poden ser més 
      d'una! per aquest motiu no es codifica en el nom). UT ha d'estar
      en majuscula ja que es facilita la legibilitat.
    + stringNom: nom de la ut o uts

- Codificació uts: NN_stringNom
- Codificació exer: utMM_NN_stringNom
    + NN: números correlatius
    + utMM: ut seguit del número d'ut (poden ser més 
      d'una! per aquest motiu no es codifica en el nom)
    + stringNom: nom de l'exercici. **Ha de tenir verb**
    + les ut poden canviar d'un any per l'altre, i els exercicis hauran
      de renumerar-se per mantenir la coherència. Es podria pensar en
      eliminar el número de ut, tanmateix pot variar, però es mala idea
      ja que queda molt confos.

- Els enllaços es fan com [][], no [](),  ja que s'asimila amb una 
  bibliografia. És cert que complica més el buscar un enllaç a on apunta
  però millora la legibilitat del texte en .md
