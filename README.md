# TechSites — Demo Templates

10 demo templates for the [TechSites.ai](https://techsites.ai) portfolio.

Each template is a complete multi-page static website for a different business niche.

## Templates

| Niche | Folder | Live Demo |
|---|---|---|
| Coach / Consultant | `coach-consultant/` | [ts-coach-consultant.pages.dev](https://ts-coach-consultant.pages.dev) |
| Dentist / Medical | `dentist-medical/` | [ts-dentist-medical.pages.dev](https://ts-dentist-medical.pages.dev) |
| E-commerce (Single Product) | `ecom-single-product/` | [ts-ecom-single-product.pages.dev](https://ts-ecom-single-product.pages.dev) |
| Fitness / Wellness | `fitness-wellness/` | [ts-fitness-wellness.pages.dev](https://ts-fitness-wellness.pages.dev) |
| Lawyer / Accountant | `lawyer-accountant/` | [ts-lawyer-accountant.pages.dev](https://ts-lawyer-accountant.pages.dev) |
| Marketing Agency | `marketing-agency/` | [ts-marketing-agency.pages.dev](https://ts-marketing-agency.pages.dev) |
| Portfolio / Freelancer | `portfolio-freelancer/` | [ts-portfolio-freelancer.pages.dev](https://ts-portfolio-freelancer.pages.dev) |
| Real Estate | `real-estate-model/` | [ts-real-estate-model.pages.dev](https://ts-real-estate-model.pages.dev) |
| Restaurant / Café | `restaurant-cafe/` | [ts-restaurant-cafe.pages.dev](https://ts-restaurant-cafe.pages.dev) |
| SaaS / Tech | `saas-tech/` | [ts-saas-tech.pages.dev](https://ts-saas-tech.pages.dev) |

## Deployment

Deploys are automatic via GitHub Actions on every push to `main`.

Each template is deployed to its own Cloudflare Pages project (`ts-{niche}.pages.dev`).

Required GitHub Secrets:
- `CF_PAGES_TOKEN` — Cloudflare API token with Pages write access
- `CF_ACCOUNT_ID` — Cloudflare Account ID (`26b19ee17142012acbf267bed32581c0`)
