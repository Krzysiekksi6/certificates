class CertificatesController < ApplicationController
  def index
    @certificates = Certificate.all

    render json: @certificates, status: :ok
  end

  def create
    @certificate = Certificate.new(certificate_params)

    if @certificate.save
      render json: @certificate, status: :created
    else
      render json: @certificate.errors, status: :unprocessable_entity
    end
  end

  def show
    @certificate = Certificate.find(params[:id])
    render json: @certificate, status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Certificate not found' }, status: :not_found
  end

  def update
    @certificate = Certificate.find(params[:id])

    if @certificate.update(certificate_params)
      render json: @certificate, status: :ok
    else
      render json: @certificate.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @certificate = Certificate.where(id: params[:id]).first
    if @certificate.destroy
      head(:ok)
    else
      head(:unprocessable_entity)
    end
  end

  private

  def certificate_params
    params.require(:certificate).permit(:name, :description, :userId)
  end
  end

