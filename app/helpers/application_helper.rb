module ApplicationHelper
  def body_class
    "#{controller_name} #{action_name}"
  end

  def title(text)
    content_for :title, text
  end

  def meta_tag(tag, text)
    content_for :"meta_#{tag}", text
  end

  def yield_meta_tag(tag, default_text='')
    content_for?(:"meta_#{tag}") ? content_for(:"meta_#{tag}") : default_text
  end

  def active_class(link_path)
    current_page?(link_path) ? "active" : ""
  end

  def hide_class(link_path, url_path)
    (current_page?(link_path) || current_page?(url_path)) ? "" : "hide"
  end
end
