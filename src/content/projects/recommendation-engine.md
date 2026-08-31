---
title: Product Recommendation Engine
summary: A hybrid recommendation engine for an eCommerce platform — built, deployed with Databricks Model Serving, and measured in production. Client and data specifics withheld.
status: active
org: Private eCommerce client
role: Data scientist
tech: [Python, Databricks, MLflow]
featured: true
order: 1
confidential: true
---

Not everything I build can be written up in detail — this engine runs on proprietary
customer and catalog data, so the client, the datasets, and the specific results stay
private. What I can share is the shape of the work, because the shape is the point.

## The problem

An eCommerce platform lives or dies on whether customers find the right product before
they lose interest. No single recommendation strategy handles that well on its own —
collaborative signals know nothing about new products and new customers, and
content-based signals never learn from behavior. The practical answer is a hybrid, and
hybrids are harder to build, deploy, and evaluate.

## The approach

Hybrid recommendation models built in Databricks, combining behavioral and content
signals, with the model lifecycle managed through MLflow. Deployment runs on an
optimized Databricks Model Serving solution, so recommendations are served to the
platform as a production service rather than a batch export.

## The measurement

A recommender you don't measure is a guess in production. The engine's results are
analyzed on an ongoing basis: how recommendations perform, where they fall short, and
what that feeds back into the next iteration of the models. The specific numbers belong
to the client; the discipline of the loop is the deliverable I can show.
