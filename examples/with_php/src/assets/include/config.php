<?php

define('CACHE', '201912');

if(strpos($_SERVER["HTTP_HOST"],'127.0.0.1') !== false){
  define('ENV', 'local');
} else {
  define('ENV', 'production');
}

