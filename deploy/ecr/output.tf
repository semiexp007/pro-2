output "ecr_url" {
  value = aws_ecr_repository.url-shortner.repository_url
}

output "ecr_name" {
  value = aws_ecr_repository.url-shortner.name
}