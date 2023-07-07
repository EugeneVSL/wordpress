
<?= get_header(); ?>


<?php if ( have_posts() ) : ?>

    <?php while ( have_posts() ) : ?>

        <?= the_post() ?>

        <h2><a class="link-primary" href="<?= the_permalink() ?>"><?= the_title() ?></a></h2>

        <p><?= the_content() ?></p>

        <hr>

    <?php endwhile ?>

<?php endif ?>

<?= get_footer(); ?>

