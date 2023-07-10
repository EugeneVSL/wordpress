<?= get_header() ?>

<?php while (have_posts()): ?>

    <?= the_post(); ?>

    <div class="page-banner">
        <div class="page-banner__bg-image" style="background-image: url(<?= get_theme_file_uri('/images/ocean.jpg') ?>"></div>
        <div class="page-banner__content container container--narrow">
            <h1 class="page-banner__title">
                <?= the_title() ?>
            </h1>
            <div class="page-banner__intro">
                <p><?= "Don't forget to replace me later." ?></p>
            </div>
        </div>
    </div>

    <div class="container container--narrow page-section">

        <?php

            $theParent = wp_get_post_parent_id(get_the_ID());
        ?>

        <?php if($theParent) : ?>
            
            <div class="metabox metabox--position-up metabox--with-home-link">
                <p>
                    <a class="metabox__blog-home-link" href="<?= get_permalink($theParent) ?>"><i class="fa fa-home" aria-hidden="true"></i> Back to 
                    <?= get_the_title($theParent) ?></a> <span class="metabox__main"><?= the_title() ?></span>
                </p>
            </div>

        <?php endif; ?>

        <?php 

            $test_array = get_pages([
                'child_of' => get_the_ID()
            ]);
        ?>
            
        <?php if($theParent or $test_array) : ?>

            <div class="page-links">
                <h2 class="page-links__title"><a href="<?= get_permalink($theParent) ?>"><?= get_the_title($theParent) ?></a></h2>
                <ul class="min-list">

                    <?php 

                        if($theParent) {

                            $findChildrenOf = $theParent;

                        } else {

                            $findChildrenOf = get_the_ID();
                        }

                        wp_list_pages([
                            'title_li' => null,
                            'child_of' => $findChildrenOf,
                            'sort_column' => 'menu_order'
                        ]); 
                    ?>
                </ul>
            </div>

        <?php endif; ?>

        <div class="generic-content">

            <?= the_content(); ?>

        </div>
    </div>

<?php endwhile; ?>

<?= get_footer(); ?>