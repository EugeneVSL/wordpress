<!DOCTYPE html>
<html lang="en" class="h-full bg-gray-100">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php bloginfo('name'); ?></title>
    <?php wp_head(); ?>
</head>
<body class="m-3">

    <?php  if ( have_posts() ) : ?>

        <?php while ( have_posts() ) : ?>

            <?= the_post() ?>

            <h2><a class="link-primary" href="<?= the_permalink() ?>"><?= the_title() ?></a></h2>

            <p><?= the_content() ?></p>

            <hr>

        <?php endwhile ?>

    <?php endif ?>

</body>
</html>
