# Now & Always Construction — Kubernetes Deployment

Deploy the Next.js application to a Kubernetes cluster.

## Quick Start

```bash
# 1. Build and push the Docker image
docker build -t now-and-always/web:latest .
docker push now-and-always/web:latest

# 2. Create the namespace
kubectl apply -f k8s/deployment.yaml

# 3. Apply all manifests
kubectl apply -f k8s/

# 4. Verify
kubectl get pods -n now-and-always
kubectl get svc -n now-and-always
kubectl get ingress -n now-and-always
```

## Architecture

```
Internet → Ingress (nginx + TLS) → Service (ClusterIP) → Pods (2–5 replicas)
```

## Files

| File | Purpose |
|------|---------|
| `k8s/deployment.yaml` | Namespace + Deployment (2 replicas, rolling updates) |
| `k8s/service.yaml` | ClusterIP service on port 80 → container port 3000 |
| `k8s/ingress.yaml` | Nginx ingress with TLS for nowandalways.co.za |
| `k8s/hpa.yaml` | Autoscaler: 2–5 pods based on CPU/memory |
| `k8s/config.yaml` | ConfigMap + NetworkPolicy |

## Rolling Updates

Zero-downtime deployments with `maxSurge: 1` and `maxUnavailable: 0`.

```bash
# Update the image
kubectl set image deployment/now-and-always-web \
  web=now-and-always-web:v2 \
  -n now-and-always

# Check rollout status
kubectl rollout status deployment/now-and-always-web -n now-and-always

# Rollback if needed
kubectl rollout undo deployment/now-and-always-web -n now-and-always
```

## Requirements

- Kubernetes 1.25+
- nginx-ingress-controller
- cert-manager (for TLS)
- Container registry access

## DNS

Point `nowandalways.co.za` and `www.nowandalways.co.za` to the ingress controller's external IP:

```bash
kubectl get ingress -n now-and-always
```
