// Service Worker для PWA функций
const CACHE_NAME = 'vetdom-nn-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// Файлы для кэширования
const STATIC_FILES = [
  '/',
  '/index.html',
  '/manifest.json',
  // Добавляем основные статические ресурсы
];

// Установка Service Worker
self.addEventListener('install', event => {
  console.log('[SW] Installing Service Worker');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('[SW] Precaching Static Files');
        return cache.addAll(STATIC_FILES);
      })
      .catch(error => {
        console.error('[SW] Error during precaching:', error);
      })
  );
  
  self.skipWaiting();
});

// Активация Service Worker
self.addEventListener('activate', event => {
  console.log('[SW] Activating Service Worker');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  self.clients.claim();
});

// Перехват запросов
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Обрабатываем только http/https запросы
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  event.respondWith(
    caches.match(request)
      .then(response => {
        // Возвращаем из кэша если есть
        if (response) {
          return response;
        }
        
        // Иначе делаем сетевой запрос
        return fetch(request)
          .then(fetchResponse => {
            // Проверяем корректность ответа
            if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
              return fetchResponse;
            }
            
            // Кэшируем только GET запросы
            if (request.method === 'GET') {
              const responseClone = fetchResponse.clone();
              
              caches.open(DYNAMIC_CACHE)
                .then(cache => {
                  cache.put(request, responseClone);
                });
            }
            
            return fetchResponse;
          })
          .catch(error => {
            console.log('[SW] Fetch failed:', error);
            
            // Возвращаем офлайн страницу для навигационных запросов
            if (request.destination === 'document') {
              return caches.match('/offline.html');
            }
          });
      })
  );
});

// Push уведомления
self.addEventListener('push', event => {
  console.log('[SW] Push received');
  
  const options = {
    body: event.data ? event.data.text() : 'Новое уведомление от ВетДом НН',
    icon: '/icon-192.png',
    badge: '/badge-72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Открыть',
        icon: '/icon-192.png'
      },
      {
        action: 'close',
        title: 'Закрыть',
        icon: '/icon-192.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('ВетДом НН', options)
  );
});

// Клик по уведомлению
self.addEventListener('notificationclick', event => {
  console.log('[SW] Notification click received');
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Background Sync для отложенной отправки форм
self.addEventListener('sync', event => {
  if (event.tag === 'background-form-sync') {
    console.log('[SW] Background sync triggered');
    event.waitUntil(doBackgroundFormSync());
  }
});

async function doBackgroundFormSync() {
  // Логика синхронизации форм в фоне
  console.log('[SW] Performing background form sync');
}