<?php

use Slim\Http\Request;
use Slim\Http\Response;

// Routes
$app->get('/[{name}]', function (Request $request, Response $response, array $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});

// RabbitMQ backend authentication
$app->post('/auth/user', function (Request $request, Response $response, array $args) {
    return $response->withStatus(200)->write('allow');
});

$app->post('/auth/vhost', function (Request $request, Response $response, array $args) {
    return $response->withStatus(200)->write('allow');
});

$app->post('/auth/resource', function (Request $request, Response $response, array $args) {
    return $response->withStatus(200)->write('allow');
});

$app->post('/auth/topic', function (Request $request, Response $response, array $args) {
    return $response->withStatus(200)->write('allow');
});