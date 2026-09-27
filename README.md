# LimbSystem

Prosedürel animasyonla hareket eden yaratıklar (kertenkele, böcek vs.) için bacak/kol sistemi. Bacağın ucu mouse'u takip ediyor, diğer eklemler segment boylarını koruyarak peşinden geliyor.

Bu repo'da sadece `LimbSystem` sınıfı var. Tek başına çalışmıyor, `Segment` ve `Creature` sınıflarıyla birlikte kullanılıyor.

## Nasıl çalışıyor

- Constructor'da ayaktan başlayıp `parent` üzerinden gövdeye kadar çıkıyor ve bacağa ait eklemleri topluyor.
- Her karede `update()` çağrılıyor, o da `moveTo()` ile ayağı hedefe doğru götürüyor.
- Ayak bir karede en fazla `speed` kadar ilerliyor, böylece hareket yumuşak oluyor.
- Sonra eklemler uçtan köke doğru, her biri bir sonrakine segment boyu kadar mesafede kalacak şekilde çekiliyor (basit ters kinematik).

## Kullanım

~~~js
const leg = new LimbSystem(footSegment, 3, 8, creature);
// creature her karede systems dizisindeki update()'leri çağırıyor
~~~

Parametreler:

- `end`: bacağın uç segmenti (ayak)
- `length`: bacaktaki en fazla eklem sayısı
- `speed`: ayağın bir karede gidebileceği en fazla mesafe
- `creature`: bacağın bağlı olduğu yaratık

## Gereksinimler

- `Segment` sınıfında `parent`, `children`, `x`, `y`, `size`, `absAngle`, `relAngle`, `isSegment` ve `updateRelative()` olmalı.
- Global bir `Input.mouse` nesnesi (`x`, `y`) ve `creature.systems` dizisi olmalı.

## Yapılacaklar

- Şu an sadece geri geçiş var, bu yüzden bacağın kökü kalçadan biraz kopabiliyor. İleri geçiş ekleyip tam FABRIK algoritmasına çevirmek istiyorum.
- Bacak şimdilik sadece mouse'u takip ediyor, adım atma / yürüme döngüsü yok.
