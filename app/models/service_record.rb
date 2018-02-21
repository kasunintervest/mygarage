class ServiceRecord < ApplicationRecord
  belongs_to :vehicle
  belongs_to :service_type
  belongs_to :service_company

  has_attached_file :attachment, styles: { medium: '600x600>', thumb: '200x200>' }, default_url: '/images/:style/missing.png'
  validates_attachment_content_type :attachment, content_type: /\Aimage\/.*\z/
  validates_attachment_size :attachment, :in => 0.megabytes..10.megabytes,  message: 'is too large, try less than 10Mb file'
  validates :service_date, presence: true
  validates_format_of :service_date, :with => /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/, :message => 'is invalid.(format: yyyy-mm-dd)'


  def attachment_url
    if self.attachment_file_name
      {:original => self.attachment.url(:original), :medium => self.attachment.url(:medium), :thumb => self.attachment.url(:thumb)}
    end
  end

  self.per_page = 10

  def as_json(options={})
    if options.key?(:only) or options.key?(:methods) or options.key?(:include) or options.key?(:except)
      super(options)
    else
      super(
        only: [:id, :service_date, :details, :mileage, :cost, :created_at, :updated_at],
        methods: [:attachment_url],
        include: {
            :service_type => {:except => [:created_at, :updated_at, :publish]},
            :service_company => {:except => [:created_at, :updated_at, :publish]},
            :vehicle => {:except => []}
        })
    end
  end

end
