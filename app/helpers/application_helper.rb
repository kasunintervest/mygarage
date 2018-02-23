module ApplicationHelper
  def current_class?(test_path)
    return 'active' if request.path == test_path
    ''
  end

  def set_active_class(resource)
    segments = request.path.split('/')
    return 'active' if segments[2] == resource
    ''
  end

  def is_page?(path)
    if request.path == path
      true
    else
      false
    end
  end
end
