
    <div class="container xxl:max-w-screen-xxl mx-auto">
        <div class="section-header flex flex-wrap justify-between items-center">
            <div class="w-1/2 lg:w-1/3 section-title">
                <h2 class="h2">Want to Learn more?</h2>
            </div>
            <div class="w-1/2 block lg:hidden section-title text-right">
                <div class="subscribe-btn-wrap">
                    <h2 class="h2"><span class="bg-black">subscribe</span></h2>
                </div>
            </div>
            <div class="w-full lg:w-2/3 hidden lg:block form-container">
                <div class="form-wrapper">
                    <?php
                    $get_form = 935;
    $form_shortcode = '[contact-form-7 id="'.$get_form.'" title="false" description="false" ajax="true"]';
    echo do_shortcode($form_shortcode); ?>
                </div>
            </div>

        </div>

    </div>
