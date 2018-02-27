if Rails.env.development? or Rails.env.test?
  class OverrideMailRecipient
    def self.delivering_email(mail)
      mail.to = ENV['DEFAULT_MAIL_RECEIPT']
    end
  end
  ActionMailer::Base.register_interceptor(OverrideMailRecipient)
end