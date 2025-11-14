// about-us.stories.ts
import type { Meta, StoryObj } from '@storybook/angular';
import { AboutUs } from './about-us';
import { signal } from '@angular/core';

const meta: Meta<AboutUs> = {
  title: 'Components/AboutUs',
  component: AboutUs,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'About Us section showcasing trainers and fitness services with responsive layout and accessibility features.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<AboutUs>;

// Default story with placeholder images
export const Default: Story = {
  render: () => ({
    props: {
      trainers: signal([
        { name: 'trainer-3', width: 358, height: 542 },
        { name: 'trainer-1', width: 353, height: 452 },
        { name: 'trainer-2', width: 222, height: 188 },
      ]),
      services: signal([
        {
          header: 'Personal Trainer',
          paragraph1: 'Achieve your fitness goals with the',
          paragraph2: 'guidance of our certified trainers.',
        },
        {
          header: 'Cardio Programs',
          paragraph1: 'From steady-state runs to interval',
          paragraph2: 'sprints, our treadmill programs.',
        },
        {
          header: 'Quality Equipment',
          paragraph1: 'Our gym is equipped with the',
          paragraph2: 'latest cardio & strength machines.',
        },
        {
          header: 'Healthy Nutrition',
          paragraph1: 'Fuel your fitness journey with',
          paragraph2: 'customized meal plans for you.',
        },
      ]),
    },
    template: `
      <section
        class="about-layout grid"
        role="region"
        aria-labelledby="about-heading"
        aria-describedby="about-summary"
      >
        <figure
          class="col-12 flex-order-1 xl:flex-order-0 relative"
          role="group"
          aria-label="Trainers gallery"
        >
          @for (t of trainers(); track t.name) {
          <picture>
            <img
              [src]="'https://placehold.co/' + t.width + 'x' + t.height + '/2c5aa0/ffffff?text=Trainer+' + t.name"
              [width]="t.width"
              [height]="t.height"
              alt="Trainer image"
              style="object-fit: cover; aspect-ratio: 1333 / 2000; border-radius: 1.125rem;"
              decoding="async"
            />
          </picture>
          }
          <figcaption class="sr-only">
            Our certified personal trainers at FitZone
          </figcaption>
        </figure>

        <article
          class="article col-12 flex-order-0 xl:flex-order-1"
          aria-labelledby="about-heading"
          aria-describedby="about-summary"
        >
          <header>
            <h1 id="about-heading">ABOUT US</h1>
            <h2 class="mt-4">EMPOWERING YOU TO ACHIEVE YOUR FITNESS GOALS</h2>
          </header>
          <p id="about-summary" class="p-vision">
            We believe fitness is more than just a workout—it's a lifestyle. With
            top-of- the-line facilities, certified trainers, and a supportive
            community, we're here to inspire and guide you every step of the way.
          </p>
          <section
            aria-labelledby="about-features"
            role="region"
            aria-describedby="about-features-desc"
          >
            <h2 id="about-features" class="sr-only">Our Key Fitness Services</h2>
            <p id="about-features-desc" class="sr-only">
              Explore our main services including personal training, cardio, quality
              equipment, and nutrition guidance.
            </p>

            <ul
              class="grid list-none p-0 m-0 text-left"
              role="list"
              aria-label="List of fitness services"
            >
              @for (item of services(); track $index) {
              <li class="col-12 sm:col-6" role="listitem">
                <article
                  [attr.aria-labelledby]="'service-' + $index + '-title'"
                  [attr.aria-describedby]="'service-' + $index + '-desc'"
                >
                  <h3 id="service-{{$index}}-title" class="service-header">
                    <picture>
                      <img
                        src="https://placehold.co/18x17/2c5aa0/ffffff?text=→"
                        width="18"
                        height="17"
                        alt="right arrow"
                        class="icon"
                        aria-hidden="true"
                        style="object-fit: cover; aspect-ratio: 18 / 17;"
                        decoding="async"
                        loading="lazy"
                      />
                    </picture>
                    {{item.header}}
                  </h3>
                  <p class="service-p">{{item.paragraph1}}</p>
                  <p class="service-p">{{item.paragraph2}}</p>
                </article>
              </li>
              <div [class.hidden]="$index !== 1" class="line-break"></div>
              }
            </ul>
          </section>

          <footer
            class="mt-5 mb-8 md:mb-0"
            role="contentinfo"
            aria-label="Get Started section"
          >
            <button type="button" aria-label="Get started with FitZone services">
              Get Started
            </button>
          </footer>
        </article>
      </section>
    `,
  }),
};

// Story with custom trainers
export const WithCustomTrainers: Story = {
  render: () => ({
    props: {
      trainers: signal([
        { name: 'john', width: 400, height: 600 },
        { name: 'sarah', width: 380, height: 570 },
        { name: 'mike', width: 420, height: 630 },
      ]),
      services: signal([
        {
          header: 'Personal Trainer',
          paragraph1: 'Achieve your fitness goals with the',
          paragraph2: 'guidance of our certified trainers.',
        },
        {
          header: 'Cardio Programs',
          paragraph1: 'From steady-state runs to interval',
          paragraph2: 'sprints, our treadmill programs.',
        },
        {
          header: 'Quality Equipment',
          paragraph1: 'Our gym is equipped with the',
          paragraph2: 'latest cardio & strength machines.',
        },
        {
          header: 'Healthy Nutrition',
          paragraph1: 'Fuel your fitness journey with',
          paragraph2: 'customized meal plans for you.',
        },
      ]),
    },
    template: `
      <section
        class="about-layout grid"
        role="region"
        aria-labelledby="about-heading"
        aria-describedby="about-summary"
      >
        <figure
          class="col-12 flex-order-1 xl:flex-order-0 relative"
          role="group"
          aria-label="Trainers gallery"
        >
          @for (t of trainers(); track t.name) {
          <picture>
            <img
              [src]="'https://placehold.co/' + t.width + 'x' + t.height + '/2c5aa0/ffffff?text=' + t.name"
              [width]="t.width"
              [height]="t.height"
              [alt]="'Trainer ' + t.name"
              style="object-fit: cover; aspect-ratio: 1333 / 2000; border-radius: 1.125rem;"
              decoding="async"
            />
          </picture>
          }
          <figcaption class="sr-only">
            Our certified personal trainers at FitZone
          </figcaption>
        </figure>

        <article
          class="article col-12 flex-order-0 xl:flex-order-1"
          aria-labelledby="about-heading"
          aria-describedby="about-summary"
        >
          <header>
            <h1 id="about-heading">ABOUT US</h1>
            <h2 class="mt-4">EMPOWERING YOU TO ACHIEVE YOUR FITNESS GOALS</h2>
          </header>
          <p id="about-summary" class="p-vision">
            We believe fitness is more than just a workout—it's a lifestyle. With
            top-of- the-line facilities, certified trainers, and a supportive
            community, we're here to inspire and guide you every step of the way.
          </p>
          <section
            aria-labelledby="about-features"
            role="region"
            aria-describedby="about-features-desc"
          >
            <h2 id="about-features" class="sr-only">Our Key Fitness Services</h2>
            <p id="about-features-desc" class="sr-only">
              Explore our main services including personal training, cardio, quality
              equipment, and nutrition guidance.
            </p>

            <ul
              class="grid list-none p-0 m-0 text-left"
              role="list"
              aria-label="List of fitness services"
            >
              @for (item of services(); track $index) {
              <li class="col-12 sm:col-6" role="listitem">
                <article
                  [attr.aria-labelledby]="'service-' + $index + '-title'"
                  [attr.aria-describedby]="'service-' + $index + '-desc'"
                >
                  <h3 id="service-{{$index}}-title" class="service-header">
                    <picture>
                      <img
                        src="https://placehold.co/18x17/2c5aa0/ffffff?text=→"
                        width="18"
                        height="17"
                        alt="right arrow"
                        class="icon"
                        aria-hidden="true"
                        style="object-fit: cover; aspect-ratio: 18 / 17;"
                        decoding="async"
                        loading="lazy"
                      />
                    </picture>
                    {{item.header}}
                  </h3>
                  <p class="service-p">{{item.paragraph1}}</p>
                  <p class="service-p">{{item.paragraph2}}</p>
                </article>
              </li>
              <div [class.hidden]="$index !== 1" class="line-break"></div>
              }
            </ul>
          </section>

          <footer
            class="mt-5 mb-8 md:mb-0"
            role="contentinfo"
            aria-label="Get Started section"
          >
            <button type="button" aria-label="Get started with FitZone services">
              Get Started
            </button>
          </footer>
        </article>
      </section>
    `,
  }),
};

// Minimal data story
export const MinimalData: Story = {
  render: () => ({
    props: {
      trainers: signal([{ name: 'trainer-1', width: 300, height: 400 }]),
      services: signal([
        {
          header: 'Basic Service',
          paragraph1: 'Essential fitness service',
          paragraph2: 'to get you started.',
        },
      ]),
    },
    template: `
      <section
        class="about-layout grid"
        role="region"
        aria-labelledby="about-heading"
        aria-describedby="about-summary"
      >
        <figure
          class="col-12 flex-order-1 xl:flex-order-0 relative"
          role="group"
          aria-label="Trainers gallery"
        >
          @for (t of trainers(); track t.name) {
          <picture>
            <img
              [src]="'https://placehold.co/' + t.width + 'x' + t.height + '/2c5aa0/ffffff?text=Trainer'"
              [width]="t.width"
              [height]="t.height"
              alt="Trainer image"
              style="object-fit: cover; aspect-ratio: 1333 / 2000; border-radius: 1.125rem;"
              decoding="async"
            />
          </picture>
          }
          <figcaption class="sr-only">
            Our certified personal trainers at FitZone
          </figcaption>
        </figure>

        <article
          class="article col-12 flex-order-0 xl:flex-order-1"
          aria-labelledby="about-heading"
          aria-describedby="about-summary"
        >
          <header>
            <h1 id="about-heading">ABOUT US</h1>
            <h2 class="mt-4">EMPOWERING YOU TO ACHIEVE YOUR FITNESS GOALS</h2>
          </header>
          <p id="about-summary" class="p-vision">
            We believe fitness is more than just a workout—it's a lifestyle. With
            top-of- the-line facilities, certified trainers, and a supportive
            community, we're here to inspire and guide you every step of the way.
          </p>
          <section
            aria-labelledby="about-features"
            role="region"
            aria-describedby="about-features-desc"
          >
            <h2 id="about-features" class="sr-only">Our Key Fitness Services</h2>
            <p id="about-features-desc" class="sr-only">
              Explore our main services including personal training, cardio, quality
              equipment, and nutrition guidance.
            </p>

            <ul
              class="grid list-none p-0 m-0 text-left"
              role="list"
              aria-label="List of fitness services"
            >
              @for (item of services(); track $index) {
              <li class="col-12 sm:col-6" role="listitem">
                <article
                  [attr.aria-labelledby]="'service-' + $index + '-title'"
                  [attr.aria-describedby]="'service-' + $index + '-desc'"
                >
                  <h3 id="service-{{$index}}-title" class="service-header">
                    <picture>
                      <img
                        src="https://placehold.co/18x17/2c5aa0/ffffff?text=→"
                        width="18"
                        height="17"
                        alt="right arrow"
                        class="icon"
                        aria-hidden="true"
                        style="object-fit: cover; aspect-ratio: 18 / 17;"
                        decoding="async"
                        loading="lazy"
                      />
                    </picture>
                    {{item.header}}
                  </h3>
                  <p class="service-p">{{item.paragraph1}}</p>
                  <p class="service-p">{{item.paragraph2}}</p>
                </article>
              </li>
              <div [class.hidden]="$index !== 1" class="line-break"></div>
              }
            </ul>
          </section>

          <footer
            class="mt-5 mb-8 md:mb-0"
            role="contentinfo"
            aria-label="Get Started section"
          >
            <button type="button" aria-label="Get started with FitZone services">
              Get Started
            </button>
          </footer>
        </article>
      </section>
    `,
  }),
};

// Mobile view story
export const MobileView: Story = {
  render: () => ({
    props: {
      trainers: signal([
        { name: 'trainer-1', width: 400, height: 600 },
        { name: 'trainer-2', width: 350, height: 500 },
        { name: 'trainer-3', width: 300, height: 450 },
      ]),
      services: signal([
        {
          header: 'Personal Trainer',
          paragraph1: 'Achieve your fitness goals with the',
          paragraph2: 'guidance of our certified trainers.',
        },
        {
          header: 'Cardio Programs',
          paragraph1: 'From steady-state runs to interval',
          paragraph2: 'sprints, our treadmill programs.',
        },
        {
          header: 'Quality Equipment',
          paragraph1: 'Our gym is equipped with the',
          paragraph2: 'latest cardio & strength machines.',
        },
        {
          header: 'Healthy Nutrition',
          paragraph1: 'Fuel your fitness journey with',
          paragraph2: 'customized meal plans for you.',
        },
      ]),
    },
    template: `
      <section
        class="about-layout grid"
        role="region"
        aria-labelledby="about-heading"
        aria-describedby="about-summary"
      >
        <figure
          class="col-12 flex-order-1 xl:flex-order-0 relative"
          role="group"
          aria-label="Trainers gallery"
        >
          @for (t of trainers(); track t.name) {
          <picture>
            <img
              [src]="'https://placehold.co/' + t.width + 'x' + t.height + '/2c5aa0/ffffff?text=Trainer+' + t.name"
              [width]="t.width"
              [height]="t.height"
              alt="Trainer image"
              style="object-fit: cover; aspect-ratio: 1333 / 2000; border-radius: 1.125rem;"
              decoding="async"
            />
          </picture>
          }
          <figcaption class="sr-only">
            Our certified personal trainers at FitZone
          </figcaption>
        </figure>

        <article
          class="article col-12 flex-order-0 xl:flex-order-1"
          aria-labelledby="about-heading"
          aria-describedby="about-summary"
        >
          <header>
            <h1 id="about-heading">ABOUT US</h1>
            <h2 class="mt-4">EMPOWERING YOU TO ACHIEVE YOUR FITNESS GOALS</h2>
          </header>
          <p id="about-summary" class="p-vision">
            We believe fitness is more than just a workout—it's a lifestyle. With
            top-of- the-line facilities, certified trainers, and a supportive
            community, we're here to inspire and guide you every step of the way.
          </p>
          <section
            aria-labelledby="about-features"
            role="region"
            aria-describedby="about-features-desc"
          >
            <h2 id="about-features" class="sr-only">Our Key Fitness Services</h2>
            <p id="about-features-desc" class="sr-only">
              Explore our main services including personal training, cardio, quality
              equipment, and nutrition guidance.
            </p>

            <ul
              class="grid list-none p-0 m-0 text-left"
              role="list"
              aria-label="List of fitness services"
            >
              @for (item of services(); track $index) {
              <li class="col-12 sm:col-6" role="listitem">
                <article
                  [attr.aria-labelledby]="'service-' + $index + '-title'"
                  [attr.aria-describedby]="'service-' + $index + '-desc'"
                >
                  <h3 id="service-{{$index}}-title" class="service-header">
                    <picture>
                      <img
                        src="https://placehold.co/18x17/2c5aa0/ffffff?text=→"
                        width="18"
                        height="17"
                        alt="right arrow"
                        class="icon"
                        aria-hidden="true"
                        style="object-fit: cover; aspect-ratio: 18 / 17;"
                        decoding="async"
                        loading="lazy"
                      />
                    </picture>
                    {{item.header}}
                  </h3>
                  <p class="service-p">{{item.paragraph1}}</p>
                  <p class="service-p">{{item.paragraph2}}</p>
                </article>
              </li>
              <div [class.hidden]="$index !== 1" class="line-break"></div>
              }
            </ul>
          </section>

          <footer
            class="mt-5 mb-8 md:mb-0"
            role="contentinfo"
            aria-label="Get Started section"
          >
            <button type="button" aria-label="Get started with FitZone services">
              Get Started
            </button>
          </footer>
        </article>
      </section>
    `,
  }),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
